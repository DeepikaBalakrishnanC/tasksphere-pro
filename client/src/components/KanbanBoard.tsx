import {

  DragDropContext,

  Draggable,

  Droppable

} from "@hello-pangea/dnd";

import {
  useState
} from "react";


interface Task {

  id: string;

  title: string;

  priority: "High" | "Medium" | "Low";

}


interface ColumnsType {

  [key: string]: Task[];

}


type DragResult = {

  source: {

    droppableId: string;

    index: number;

  };

  destination: {

    droppableId: string;

    index: number;

  } | null;

};

const columnLabels: Record<string, string> = {
  todo: "To Do",
  inProgress: "In Progress",
  review: "Review",
  completed: "Completed"
};

const priorityStyles: Record<Task["priority"], string> = {
  High: "bg-red-500/20 text-red-400",
  Medium: "bg-yellow-500/20 text-yellow-300",
  Low: "bg-green-500/20 text-green-300"
};

const initialData: ColumnsType = {

  todo: [

    {
      id: "1",
      title: "Design Landing Page",
      priority: "High",
    },

    {
      id: "2",
      title: "Setup GraphQL API",
      priority: "High",
    },

  ],

  inProgress: [

    {
      id: "3",
      title: "Build Dashboard UI",
      priority: "Medium",
    },

  ],

  review: [

    {
      id: "4",
      title: "Test Authentication",
      priority: "Medium",
    },

  ],

  completed: [

    {
      id: "5",
      title: "Create Database",
      priority: "Low",
    },

  ],

};


const KanbanBoard = () => {

  const [columns, setColumns] =
    useState<ColumnsType>(initialData);

  const [isTaskFormOpen, setIsTaskFormOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [status, setStatus] =
    useState("todo");

  const [priority, setPriority] =
    useState<Task["priority"]>("Medium");


  const onDragEnd = (
    result: DragResult
  ) => {

    const {
      source,
      destination
    } = result;


    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setColumns((currentColumns) => {
      const sourceColumn =
        [...currentColumns[source.droppableId]];

      const [removed] =
        sourceColumn.splice(
          source.index,
          1
        );

      if (source.droppableId === destination.droppableId) {
        sourceColumn.splice(
          destination.index,
          0,
          removed
        );

        return {
          ...currentColumns,
          [source.droppableId]:
            sourceColumn
        };
      }

      const destinationColumn =
        [...currentColumns[destination.droppableId]];

      destinationColumn.splice(
        destination.index,
        0,
        removed
      );

      return {
        ...currentColumns,
        [source.droppableId]:
          sourceColumn,
        [destination.droppableId]:
          destinationColumn
      };
    });

  };

  const handleAddTask = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const trimmedTitle =
      title.trim();

    if (!trimmedTitle) {
      return;
    }

    const task: Task = {
      id:
        crypto.randomUUID(),
      title:
        trimmedTitle,
      priority
    };

    setColumns((currentColumns) => ({
      ...currentColumns,
      [status]: [
        task,
        ...currentColumns[status]
      ]
    }));

    setTitle("");
    setStatus("todo");
    setPriority("Medium");
    setIsTaskFormOpen(false);
  };


  return (

    <div className="mt-12">

      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8"
      >

        <h2
          className="text-3xl font-bold"
        >

          Project Workflow

        </h2>


        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
          onClick={() => setIsTaskFormOpen(true)}
        >

          + Add Task

        </button>

      </div>

      {isTaskFormOpen && (
        <form
          onSubmit={handleAddTask}
          className="mb-8 grid gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-4 md:grid-cols-[1fr_180px_150px_auto]"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
            autoFocus
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
          >
            {Object.entries(columnLabels).map(([value, label]) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
          >
            <option value="High">
              High
            </option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">
              Low
            </option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-xl bg-green-600 px-4 py-3 font-semibold hover:bg-green-700"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setIsTaskFormOpen(false)}
              className="rounded-xl bg-slate-800 px-4 py-3 font-semibold text-slate-200 hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}


      <DragDropContext
        onDragEnd={onDragEnd}
      >

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >

          {Object.entries(columns).map(

            ([columnId, tasks]) => (

              <Droppable

                droppableId={columnId}

                key={columnId}

              >

                {(provided) => (

                  <div

                    ref={provided.innerRef}

                    {...provided.droppableProps}

                    className="bg-slate-900 rounded-2xl p-4 min-h-[500px] border border-slate-800"

                  >

                    <div
                      className="flex items-center justify-between mb-6"
                    >

                      <h3
                        className="text-xl font-bold"
                      >

                        {columnLabels[columnId]}

                      </h3>


                      <span
                        className="bg-slate-700 text-sm px-3 py-1 rounded-full"
                      >

                        {tasks.length}

                      </span>

                    </div>


                    {tasks.map(

                      (task, index) => (

                        <Draggable

                          key={task.id}

                          draggableId={task.id}

                          index={index}

                        >

                          {(provided) => (

                            <div

                              ref={provided.innerRef}

                              {...provided.draggableProps}

                              {...provided.dragHandleProps}

                              className="bg-slate-800 p-4 rounded-2xl mb-4 shadow-lg hover:bg-slate-700 transition cursor-pointer"

                            >

                              <div
                                className="flex items-center justify-between gap-4"
                              >

                                <p
                                  className="font-medium"
                                >

                                  {task.title}

                                </p>


                                <div
                                  className="h-3 w-3 shrink-0 rounded-full bg-green-500"
                                />

                              </div>


                              <div
                                className="flex items-center gap-2 mt-4 text-sm text-slate-400"
                              >

                                <span>
                                  Priority:
                                </span>

                                <span
                                  className={`${priorityStyles[task.priority]} px-2 py-1 rounded-lg`}
                                >

                                  {task.priority}

                                </span>

                              </div>

                            </div>

                          )}

                        </Draggable>

                      )

                    )}


                    {provided.placeholder}

                  </div>

                )}

              </Droppable>

            )

          )}

        </div>

      </DragDropContext>

    </div>

  );

};

export default KanbanBoard;
