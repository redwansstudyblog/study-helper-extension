// ─── Alarm Handler ────────────────────────────────────────
chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get("lang", (d) => {
    const l = d.lang || "bn";

    if (alarm.name === "waterReminder") {
      const titles = { en:"💧 Drink Water!", bn:"💧 পানি পান করো!" };
      const msgs   = { en:"Stay hydrated! Take a sip.", bn:"শরীর সুস্থ রাখো! এক চুমুক পানি।" };
      chrome.notifications.create("water_" + Date.now(), {
        type:"basic", iconUrl:"icon48.png",
        title: titles[l]||titles.en, message: msgs[l]||msgs.en, priority:1
      });
    }

    if (alarm.name === "scheduledStart") {
      const titles = { en:"⏰ Time to Study!", bn:"⏰ পড়ার সময় হয়েছে!" };
      const msgs   = { en:"Scheduled session starting. Open Study Helper!", bn:"নির্ধারিত session শুরু হচ্ছে। Study Helper খোলো!" };
      chrome.notifications.create("sched_" + Date.now(), {
        type:"basic", iconUrl:"icon48.png",
        title: titles[l]||titles.en, message: msgs[l]||msgs.en, priority:2
      });
      chrome.storage.local.set({ pendingAutoStart: true });
    }
  });
});

// ─── Block List ───────────────────────────────────────────
const DEFAULT_SITES = ["facebook.com", "tiktok.com"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "loading" || !tab.url) return;
  chrome.storage.sync.get(["block","blockList"], (data) => {
    if (!data.block) return;
    const list = data.blockList || DEFAULT_SITES;
    if (list.some(site => tab.url.includes(site))) {
      chrome.tabs.update(tabId, { url: "chrome://newtab" });
    }
  });
});
