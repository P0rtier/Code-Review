export default interface ISchedultedReview {
    id: string,
    title: string,
    scheduledTo: string,
    scheduled: Date,
    team: string,
    pullRequest: string,
    description: string
}