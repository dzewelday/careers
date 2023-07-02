import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import type { Job } from "@/api/types";

export const useJobsStore = defineStore("jobs", () => {
  const jobs = ref<Job[]>([]);

  async function fetchJobs() {
    jobs.value = await getJobs();
  }

  const uniqueOrganizations = computed(() => {
    const uniqueOrganizations = new Set<string>();
    jobs.value.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  });

  const uniqueJobTypes = computed(() => {
    const uniqueJobTypes = new Set<string>();
    jobs.value.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  });

  const filteredJobs = computed(() => {
    return jobs.value
      .filter(() => includeJobByOrganization())
      .filter(() => includeJobByJobType())
      .filter(() => includeJobByDegree());
  });

  const includeJobByOrganization = () => (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedOrganizations.length === 0) return true;
    return userStore.selectedOrganizations.includes(job.organization);
  };

  const includeJobByJobType = () => (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedOrganizations.length === 0) return true;
    return userStore.selectedOrganizations.includes(job.jobType);
  };

  const includeJobByDegree = () => (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedJobTypes.length === 0) return true;
    return userStore.selectedJobTypes.includes(job.degree);
  };

  return {
    jobs,
    fetchJobs,
    includeJobByJobType,
    includeJobByOrganization,
    includeJobByDegree,
    uniqueJobTypes,
    uniqueOrganizations,
    filteredJobs,
  };
});