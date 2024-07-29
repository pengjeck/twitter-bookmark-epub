import delay from "delay";

export default defineBackground(() => {
  let tabId: number
  let authorization: string | undefined
  let csrfToken: string | undefined

  // if (typeof window.browser === "undefined") {
  //   // For Chrome only
  //   webRequestOptions.push("extraHeaders")
  // }

  // browser.webRequest.onBeforeSendHeaders.addListener(
  //   details => {
  //     const requestHeaders = details.requestHeaders
  //     if (requestHeaders == undefined) {
  //       return;
  //     }
  //     // This is required for our fetch requests to succeed in Chromes
  //     if (!requestHeaders.find(h => h.name.toLowerCase() === "origin")) {
  //       requestHeaders.push({ name: "Origin", value: "https://twitter.com" })
  //     }
  //     return {
  //       requestHeaders,
  //     }
  //   },
  //   { urls: ["*://*.twitter.com/*Bookmarks*"] },
  //   ["requestHeaders", "blocking"]
  // )

  browser.webRequest.onSendHeaders.addListener(
    async details => {
      tabId = details.tabId
      const requestHeaders = details.requestHeaders
      if (requestHeaders == undefined) {
        return;
      }

      const authorizationHeader = requestHeaders.find(h => h.name.toLowerCase() === "authorization")
      authorization = authorizationHeader?.value
      const csrfTokenHeader = requestHeaders.find(h => h.name.toLowerCase() === "x-csrf-token")
      csrfToken = csrfTokenHeader?.value
      sendCredentials()
    },
    { urls: ["*://*.twitter.com/*Bookmarks*", "*://*.x.com/*Bookmarks*"] },
    ["requestHeaders"]
  )

  async function sendCredentials() {
    try {
      console.log("Trying message...")
      const res = await browser.tabs.sendMessage(tabId, {
        name: "credentials",
        authorization,
        csrfToken,
      })
      console.log("Sent message")
    } catch (err) {
      console.log("error", err)
      await delay(50)
    }
  }
});
