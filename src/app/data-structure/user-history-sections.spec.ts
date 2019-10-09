import { QuizQuestion } from "./quiz-question";
import { UserHistorySections } from "./user-history-sections";
import { UserStats } from "./user-stats";

describe("UserHistorySections without the TestBed", () => {

  it("getUserStatsForSection() should return value previously set with setUserStatsForSection().", () => {
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
});
