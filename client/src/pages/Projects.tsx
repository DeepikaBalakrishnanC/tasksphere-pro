import {
  useMemo,
  useState
} from "react";

import { useQuery } from "@apollo/client/react";

import {
  useSearchParams
} from "react-router-dom";

import CreateProjectModal
from "../components/CreateProjectModal";

import {

  GET_PROJECTS

} from "../graphql/projects";

import DashboardLayout
from "../layouts/DashboardLayout";

type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  owner?: string | null;
};

type ProjectsData = {
  projects: Project[];
};

const Projects = () => {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const query =
    searchParams.get("search") || "";

  const {

    data,

    loading,

    error

  } = useQuery<ProjectsData>(
    GET_PROJECTS,
    {
      fetchPolicy: "cache-and-network"
    }
  );

  const projects =
    useMemo(() => {
      const allProjects =
        data?.projects || [];

      if (!query.trim()) {
        return allProjects;
      }

      const normalizedQuery =
        query.toLowerCase();

      return allProjects.filter((project) =>
        [
          project.name,
          project.description,
          project.status,
          project.owner || ""
        ].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      );
    }, [
      data?.projects,
      query
    ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-[#15b8a6]">
            Mission archive
          </p>
          <h1 className="mt-1 text-4xl font-black">
            Missions
          </h1>
          <p className="mt-2 max-w-2xl text-[#b7afa0]">
            GraphQL-powered project records with offline-ready client caching.
          </p>
        </div>

        <button
          className="rounded-lg bg-[#15b8a6] px-4 py-2 font-bold text-[#071211] hover:bg-[#48d4c8]"
          onClick={() => setIsModalOpen(true)}
        >
          + New Mission
        </button>
      </div>

      {query && (
        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-[#151922] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#d9d3c3]">
            Showing results for <span className="font-semibold text-white">{query}</span>
          </p>
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="rounded-lg border border-white/10 bg-[#101318] px-4 py-2 text-sm hover:border-[#15b8a6]"
          >
            Clear Search
          </button>
        </div>
      )}

      {loading && (
        <p className="mt-8 text-[#d9d3c3]">
          Loading missions...
        </p>
      )}

      {error && (
        <p className="mt-8 rounded-lg bg-[#e85d75]/10 p-4 text-[#ff9aae]">
          Unable to load missions. Cached data will appear when available.
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="mt-8 rounded-lg border border-white/10 bg-[#151922] p-8 text-center">
          <p className="text-lg font-semibold">
            No missions found
          </p>
          <p className="mt-2 text-[#b7afa0]">
            Create a mission or clear the search filter.
          </p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-lg border border-white/10 bg-[#151922] p-5 transition hover:border-[#15b8a6]"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-black">
                {project.name}
              </h2>
              <span className="rounded-full bg-[#15b8a6]/15 px-3 py-1 text-sm text-[#7ce2d7]">
                {project.status}
              </span>
            </div>

            <p className="mt-4 text-[#d9d3c3]">
              {project.description}
            </p>

            <div className="mt-6 border-t border-white/10 pt-4 text-sm text-[#b7afa0]">
              Owner: {project.owner || "Launch desk"}
            </div>
          </article>
        ))}
      </div>

      <CreateProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Projects;
