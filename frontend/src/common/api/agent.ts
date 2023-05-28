import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IAuthResponse } from "../interfaces/IAuthResponse";
import { IUser } from "../interfaces/IUser";
import { toast } from "react-toastify";
import { IErrorData } from "../utils/IErrorData";
import { StatusCodes } from "../enums/StatusCodes";
import { CSSProperties } from "react";
import { router } from "../../pages/app/App";
import { IProject } from "../interfaces/IProject";
import { IReviewer } from "../interfaces/IReviewer";
import { INotification } from "../interfaces/INotification";
import { IProjectNameState } from "../interfaces/IProjectNameState";
import { IProjectLeaderboard } from "../interfaces/IProjectLeaderboard";
import { formatDateShort } from "../utils/helpers";
import { IStatsTeamMember } from "../interfaces/IStatsTeamMember";
import { IUnassignedReview } from "../interfaces/IUnassignedReview";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL + "/api";

axios.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser: IUser = JSON.parse(user);
    config.headers.Authorization = `Bearer ${parsedUser.accessToken}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.message === "Network Error" && !error.response) {
      toast.error("Network error - make sure API is running!");
    }

    if (!error.response) {
      return Promise.reject(error);
    }

    const { data, status } = error.response;

    switch (status) {
      case StatusCodes.BadRequest:
        const parsedData = data as IErrorData;
        const toastStyle: CSSProperties = { whiteSpace: "pre-line" };
        toast.error(`${parsedData.title}\n${parsedData.detail}`, {
          style: toastStyle,
        });
        break;

      case StatusCodes.Unauthorized:
        return refreshToken(error);

      case StatusCodes.Gone:
        router.navigate("/not-found");
        break;

      case StatusCodes.InternalServerError:
        router.navigate("/server-error");
        break;

      default:
        break;
    }

    return Promise.reject(error);
  }
);

const refreshToken = async (error: AxiosError) => {
  const user = localStorage.getItem("user");

  if (!user) {
    router.navigate("/login");
    return Promise.reject(error);
  }

  if (error.config) {
    const parsedUser: IUser = JSON.parse(user);
    try {
      const response = await agent.Auth.refreshAccess(
        parsedUser.refreshToken,
        parsedUser.accessToken
      );
      const { accessToken, refreshToken } = response;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...parsedUser, accessToken, refreshToken })
      );
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return axios.request(error.config);
    } catch (error) {
      localStorage.removeItem("user");
      router.navigate("/login");
      return Promise.reject(error);
    }
  }

  localStorage.removeItem("user");
  router.navigate("/login");
  return Promise.reject(error);
};

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig<any>) =>
    axios.get<T>(url, config).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body?: {}, params?: {}) =>
    axios.put<T>(url, body, params).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
  login: (email: string, password: string) =>
    requests.post<IAuthResponse>("/auth/login", {
      email: email,
      password: password,
    }),
  register: (email: string, password: string) =>
    requests.post<IAuthResponse>("/auth/register", {
      email: email,
      password: password,
    }),
  refreshAccess: (refreshToken: string, accessToken: string) =>
    requests.post<IAuthResponse>("/auth/refresh-access", {
      refreshToken: refreshToken,
      accessToken: accessToken,
    }),
};

const Leaderboard = {
  getUserStandings: (projectId: string) => requests.get<IProjectLeaderboard>(`/leaderboards/${projectId}`),
};

const Notifications = {
  getMine: () => requests.get<INotification[]>('/notifications'),
  delete: (id: string) => requests.del(`/notifications/${id}`),
  deleteAll: () => requests.del(`/notifications/`),
};

const Projects = {
  getNames: () => requests.get<IProjectNameState[]>('/azure/projects'),
};

const Reviews = {
  getMine: () =>
    requests
      .get<IProject[]>("/azure/work-items/reviews/user")
      .then((projects) => {
        for (const project of projects) {
          for (const assignedReview of project.assignedReviews) {
            assignedReview.createdDate = new Date(assignedReview.createdDate);
          }
          for (const unassignedReview of project.unassignedReviews) {
            unassignedReview.createdDate = new Date(
              unassignedReview.createdDate
            );
          }
        }
        return projects;
      }),
};

const Reviewers = {
  getAll: (project: string, startDate: Date, endDate: Date) =>
    requests.get<IReviewer[]>("/azure/review-sorted-users", {
      params: {
        project: project,
        startDate: formatDateShort(startDate),
        endDate: formatDateShort(endDate),
      },
    }),
  assign: (reviewId: string, email: string, project: string) =>
    requests.put(
      `/azure/reviewer/${reviewId}?email=${email}&project=${project}`
    ),
};

const Stats = {
  get: (project: string, startDate: Date, endDate: Date) =>
    requests.get<IStatsTeamMember[]>("/azure/review-statistics", {
      params: {
        project: project,
        startDate: formatDateShort(startDate),
        endDate: formatDateShort(endDate),
      },
    }),
};

const WorkItems = {
  getById: (id: string) => requests.get<IUnassignedReview>(`/azure/work-items/${id}`)
    .then((review) => {
      review.createdDate = new Date(review.createdDate);
      return review;
    }),
};

const agent = {
  Auth,
  Leaderboard,
  Notifications,
  Projects,
  Reviews,
  Reviewers,
  WorkItems,
  Stats,
};

export default agent;
