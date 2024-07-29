export default defineContentScript({
  matches: ["*://*.twitter.com/*", "*://*.x.com/*"],
  main() {

    let authorization: string
    let csrfToken: string

    async function messageListener(message:
      { name: string; authorization: string; csrfToken: string; }) {
      console.log("Received message", message)
      if (message.name === "credentials") {
        authorization = message.authorization
        csrfToken = message.csrfToken
      }
    }

    browser.runtime.onMessage.addListener(messageListener)

    async function fetchBookmarks() {
      if (!authorization) {
        return console.log("authorization is blank")
      }
      if (!csrfToken) {
        return console.log("csrfToken is blank")
      }

      // console.log("Fetching bookmarks...")
      const res = await fetch(
        "https://api.twitter.com/2/timeline/bookmark.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_composer_source=true&include_ext_alt_text=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweets=true&count=10000&ext=mediaStats%2CcameraMoment",
        {
          credentials: "include",
          headers: {
            accept: "*/*",
            // "sec-fetch-mode": "cors",
            // "sec-fetch-site": "same-site",
            "x-twitter-active-user": "yes",
            "x-twitter-auth-type": "OAuth2Session",
            "x-csrf-token": csrfToken,
            authorization,
          },
          referrer: window.location.href,
          method: "GET",
          // mode: "cors",
        }
      )
      console.log("RES", res)
      const json = await res.json()
      console.log("RES json", json)
      return json
    }



  },
});
