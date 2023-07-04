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
    return [...new Set(jobs.value.map((job) => job.organization))];
  });

  const uniqueJobTypes = computed(() => {
    const uniqueJobTypes = new Set<string>();
    jobs.value.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  });

  const filteredJobs = computed(() => {
    return jobs.value
      .filter((job) => includeJobByOrganization(job))
      .filter((job) => includeJobByJobType(job))
      .filter((job) => includeJobByDegree(job));
  });

  const includeJobByOrganization = (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedOrganizations.length === 0) return true;
    return userStore.selectedOrganizations.includes(job.organization);
  };

  const includeJobByJobType = (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedOrganizations.length === 0) return true;
    return userStore.selectedOrganizations.includes(job.jobType);
  };

  const includeJobByDegree = (job: Job) => {
    const userStore = useUserStore();
    if (userStore.selectedJobTypes.length === 0) return true;
    return userStore.selectedJobTypes.includes(job.degree);
  };

  function includeJob(job: Job, list: string[]) {
    if (list.length === 0) return true;
    return list.includes(job.degree);
  }

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
