import { useContext, useEffect, useState } from "react";
import { CourseContext } from "./Sub";
import { useNavigate, useParams } from "react-router-dom";

export default function Module() {
  const { course, setCourse } = useContext(CourseContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const [module, setModule] = useState();

  useEffect(() => {
    const currCourse = course;
    currCourse.modulos.forEach((mod) => {
      if (mod.id == id) {
        if (mod.conteudos.every((cont) => cont.completo == 1)) {
          mod.completo = 1;
        } else {
          return mod;
        }
      } else {
        return mod;
      }
    });

    setCourse(currCourse);
  }, [course]);

  useEffect(() => {
    setModule(course.modulos.find((mod) => mod.id == id));
  }, [id]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">{module?.titulo}</h1>

      <div className="flex flex-col gap-2">
        {module?.conteudos?.map((cont) => (
          <div
            key={cont.titulo}
            className="flex gap-2 items-center rounded-md w-fit"
          >
            <span
              className="hover:bg-blue-100 rounded-md py-2 px-4 cursor-pointer"
              onClick={() =>
                navigate(`/module/${module.id}/content/${cont.id}`)
              }
            >
              {cont.titulo}
            </span>
            <span
              className={`
									w-4 h-4 border-2 border-blue-400 rounded-full
									${cont.completo === 1 && "bg-blue-500"}
								`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
