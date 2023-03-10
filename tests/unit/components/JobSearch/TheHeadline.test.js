import { screen, render } from "@testing-library/vue";
import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import { nextTick } from "vue";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays intro action verb", () => {
    render(TheHeadline);

    const actionVerb = screen.getByRole("heading", {
      name: /build for everyone/i,
    });
    expect(actionVerb).toBeInTheDocument();
  });

  it("changes action verb at an interval", () => {
    const setInterval = vi.fn();
    vi.stubGlobal("setInterval", setInterval);
    render(TheHeadline);

    expect(setInterval).toHaveBeenCalled();
  });

  it("swaps action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick();

    const actionVerb = screen.getByRole("heading", {
      name: /create for everyone/i,
    });
    expect(actionVerb).toBeInTheDocument();
  });

  it("removes interval when component disappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);

    const { unmount } = render(TheHeadline);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
