import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";
import type { Job } from "@/api/types";
import { createJob } from "../../../utils/createJob";

describe("JobListing", () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: { stubs: { "router-link": RouterLinkStub } },
      props: { job: { ...job } },
    });
  };

  it("renders job title", () => {
    const job = createJob({ title: "React Programmer" });
    renderJobListing(job);
    expect(screen.getByText("React Programmer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const job = createJob({ organization: "Microsoft" });
    renderJobListing(job);
    expect(screen.getByText("Microsoft")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const job = createJob({ locations: ["Miami", "Orlando"] });
    renderJobListing(job);
    expect(screen.getByText("Miami")).toBeInTheDocument();
    expect(screen.getByText("Orlando")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const job = createJob({
      minimumQualifications: ["Code", "Develop"],
    });
    renderJobListing(job);
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
  });
});