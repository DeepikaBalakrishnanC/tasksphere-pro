import {
  useState
} from "react";

import {
  requestPushPermission
} from "../serviceWorkerRegistration";

import DashboardLayout
from "../layouts/DashboardLayout";

const Settings = () => {
  const [notificationStatus, setNotificationStatus] =
    useState("");

  const enableNotifications = async () => {
    const permission =
      await requestPushPermission();

    if (permission === "granted") {
      setNotificationStatus(
        "Notifications are enabled."
      );
      return;
    }

    if (permission === "unsupported") {
      setNotificationStatus(
        "This browser does not support notifications."
      );
      return;
    }

    setNotificationStatus(
      "Notifications were not enabled."
    );
  };

  return (
    <DashboardLayout>
      <div>
        <p className="text-sm font-semibold uppercase text-[#15b8a6]">
          Systems
        </p>
        <h1 className="mt-1 text-4xl font-black">
          Workspace systems
        </h1>
        <p className="mt-2 text-[#b7afa0]">
          Configure the installable PWA layer and offline behavior.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-white/10 bg-[#151922] p-6">
          <h2 className="text-2xl font-black">
            Push signals
          </h2>
          <p className="mt-2 text-[#b7afa0]">
            Allow PulseForge to notify you when mission status changes.
          </p>
          <button
            onClick={enableNotifications}
            className="mt-5 rounded-lg bg-[#15b8a6] px-4 py-2 font-bold text-[#071211] hover:bg-[#48d4c8]"
          >
            Enable Notifications
          </button>

          {notificationStatus && (
            <p className="mt-4 rounded-lg bg-[#101318] p-3 text-sm text-[#d9d3c3]">
              {notificationStatus}
            </p>
          )}
        </section>

        <section className="rounded-lg border border-white/10 bg-[#151922] p-6">
          <h2 className="text-2xl font-black">
            Offline shell
          </h2>
          <p className="mt-2 text-[#b7afa0]">
            The app shell, mission interface, and key assets are cached by the service worker for fast repeat visits.
          </p>
          <div className="mt-5 rounded-lg bg-[#101318] p-4 text-sm text-[#d9d3c3]">
            Cache mode: network first for GraphQL, cache first for app shell.
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
