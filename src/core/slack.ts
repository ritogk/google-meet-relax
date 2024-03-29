import { SlackApi, Channel } from "@ritogk/private-api"
const slackApi = new SlackApi()

export const sendMessage = (text: string) => {
  slackApi.apiSlackSendPost({
    apiSlackSendPostRequest: {
      channel: Channel.GoogleMeetRelax,
      text: `■GoogleMeetリラックス[エラーレポート]\n${text}`,
    },
  })
}
