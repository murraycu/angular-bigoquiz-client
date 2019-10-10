import { QuizQuestion } from "./quiz-question";
import { UserHistorySections } from "./user-history-sections";
import { UserStats } from "./user-stats";

describe("UserHistorySections without the TestBed", () => {

  it("getUserStatsForSection() should return value previously added with setUserStatsForSection().", () => {
    const sections: UserHistorySections = new UserHistorySections();

    const sectionId = "some-section-id";
    const sectionTitle = "some-section-title";

    const userStats: UserStats = new UserStats();
    userStats.sectionId = sectionId;
    userStats.sectionTitle = sectionTitle;

    sections.setUserStatsForSection(sectionId, userStats);

    const result = sections.getUserStatsForSection(sectionId);

    expect(result).toBeTruthy();
    expect(result.sectionId).toBe(sectionId);
    expect(result.sectionTitle).toBe(sectionTitle);
  });

  it("getUserStatsForSection() should return value previously changed with setUserStatsForSection().", () => {
    const sections: UserHistorySections = new UserHistorySections();

    const sectionId = "some-section-id";
    const sectionTitle = "some-section-title";
    const changedSectionTitle = "changed-section-title";

    const userStats: UserStats = new UserStats();
    userStats.sectionId = sectionId;
    userStats.sectionTitle = sectionTitle;
    sections.setUserStatsForSection(sectionId, userStats);

    const userStats2 = sections.getUserStatsForSection(sectionId);

    // Change it:
    userStats2.sectionTitle = changedSectionTitle;

    // We don't need to call setUserStatsForSection()
    // because we are already changing a shared reference.
    // sections.setUserStatsForSection(sectionId, userStats2)

    const result = sections.getUserStatsForSection(sectionId);

    expect(result).toBeTruthy();
    expect(result.sectionId).toBe(sectionId);
    expect(result.sectionTitle).toBe(changedSectionTitle);
  });
});
