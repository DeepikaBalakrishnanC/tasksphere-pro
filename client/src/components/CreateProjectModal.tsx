import {

  useState

} from "react";

import {

  useMutation

} from "@apollo/client/react";

import toast
from "react-hot-toast";

import {

  CREATE_PROJECT,

  GET_PROJECTS

} from "../graphql/projects";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({
  open,
  onClose
}: Props) => {
  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [createProject, {
    loading
  }] = useMutation(
    CREATE_PROJECT,
    {
      refetchQueries: [
        {
          query: GET_PROJECTS
        }
      ]
    }
  );

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await createProject({
          variables: {
            name,
            description
          }
        });

        toast.success(
          "Mission created"
        );

        setName("");
        setDescription("");
        onClose();
      } catch {
        toast.error(
          "Mission could not be created"
        );
      }
    };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-lg border border-white/10 bg-[#151922] p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#15b8a6]">
              New mission
            </p>
            <h2 className="mt-1 text-2xl font-black">
              Define the next launch
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-[#b7afa0] hover:text-white"
            aria-label="Close"
          >
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Mission name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#101318] p-4 outline-none"
            required
          />

          <textarea
            placeholder="What outcome will this mission create?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-32 w-full rounded-lg border border-white/10 bg-[#101318] p-4 outline-none"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-[#15b8a6] p-4 font-bold text-[#071211] hover:bg-[#48d4c8] disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Mission"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
