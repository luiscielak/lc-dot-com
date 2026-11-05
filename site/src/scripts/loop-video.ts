/* Muted looping case-study clips. Autoplay only when the visitor has not
   asked for reduced motion. A visible play/pause control covers WCAG 2.2.2
   even when the clip is decorative. */

const reduceMq = () => window.matchMedia("(prefers-reduced-motion: reduce)");

function isHiddenPanel(video: HTMLVideoElement): boolean {
  const panel = video.closest("[role='tabpanel']");
  return Boolean(panel && !panel.hasAttribute("data-selected"));
}

function sync(video: HTMLVideoElement, button: HTMLButtonElement): void {
  const playing = !video.paused && !video.ended;
  button.hidden = false;
  button.setAttribute("aria-pressed", playing ? "true" : "false");
  button.setAttribute("aria-label", playing ? "Pause video" : "Play video");
  button.textContent = playing ? "Pause" : "Play";
}

function stageFor(video: HTMLVideoElement): HTMLElement | null {
  return (
    video.closest(".work-loop-stage, .es-flow-phone, figure") ?? video.parentElement
  );
}

export function mountLoopVideos(root: ParentNode = document): void {
  const reduce = reduceMq();

  root.querySelectorAll<HTMLVideoElement>(".js-loop-video").forEach((video) => {
    if (video.dataset.loopBound === "1") return;
    video.dataset.loopBound = "1";

    const stage = stageFor(video);
    const fallback = stage?.querySelector<HTMLElement>(".js-video-fallback") ?? null;
    let button = stage?.querySelector<HTMLButtonElement>("[data-loop-toggle]") ?? null;
    if (!button && stage) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "work-loop-toggle";
      button.dataset.loopToggle = "";
      stage.appendChild(button);
    }
    if (!button) return;

    const showVideo = () => {
      video.removeAttribute("hidden");
      fallback?.setAttribute("hidden", "");
    };

    const applyMotion = () => {
      if (reduce.matches || isHiddenPanel(video)) {
        video.pause();
        showVideo();
        sync(video, button);
        return;
      }
      showVideo();
      void video
        .play()
        .then(() => sync(video, button))
        .catch(() => {
          video.setAttribute("hidden", "");
          fallback?.removeAttribute("hidden");
          button.hidden = true;
        });
    };

    button.addEventListener("click", () => {
      if (video.paused) {
        showVideo();
        void video.play().then(() => sync(video, button));
      } else {
        video.pause();
        sync(video, button);
      }
    });

    video.addEventListener("play", () => sync(video, button));
    video.addEventListener("pause", () => sync(video, button));

    applyMotion();
    reduce.addEventListener("change", applyMotion);
  });
}
