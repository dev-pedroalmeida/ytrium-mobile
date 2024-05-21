import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CourseSubscribed({ route, navigation }) {
  const [course, setCourse] = useState({});

  async function fakeGetCourseById(id) {
    const coursesList = [
      {
        cur_id: 1,
        cur_titulo: "React básico",
        cur_descricao:
          '[{"type":"heading-one","children":[{"text":"Lorem"}],"align":"center"},{"type":"paragraph","children":[{"text":"Lorem "},{"text":"ipsum ","bold":true},{"text":"dolor sit amet, consectetur adipiscing elit. In at rhoncus tortor. Curabitur ultricies tristique posuere. Integer id vulputate augue. Donec tincidunt nibh nunc. In quis rutrum massa. Sed tempor, metus non mattis lobortis, "},{"text":"mi ","italic":true},{"text":"felis dignissim ex, ac commodo purus leo a est. Maecenas pellentesque elit ut ultrices volutpat. Donec tempus nisi non tempus scelerisque. Sed quis efficitur velit. Etiam vel porta turpis, vel posuere odio. Etiam venenatis lacus ut eleifend viverra."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Suspendisse id sagittis purus. Duis id vulputate nisl. "},{"text":"Donec ","underline":true},{"text":"lobortis, nisl quis facilisis commodo, sapien arcu fermentum turpis, vitae feugiat velit mauris luctus diam. Nullam porttitor mattis congue. Pellentesque fringilla semper leo, quis sagittis ligula gravida eget. Sed ligula metus, rhoncus non mauris nec, commodo cursus justo. Nam tincidunt id dolor a maximus."}],"align":"justify"}]',
        cur_status: "publico",
        cur_qtdInscritos: 1,
        cur_dificuldade: "Iniciante",
        cur_qtdExperiencia: 1000,
        usu_nome: "Instrutor",
        alc_status: 1,
        categorias: [
          {
            id: 1,
            descricao: "Javascript",
          },
          {
            id: 2,
            descricao: "React",
          },
        ],
        modulos: [
          {
            id: 1,
            index: 0,
            titulo: "Módulo 1",
            quizzes: [
              {
                id: 1,
                index: 1,
                titulo: "Hooks do React",
                questoes: [
                  {
                    id: 1,
                    index: 0,
                    pergunta: "Oque é um hook",
                    alternativas: [
                      {
                        id: 1,
                        index: 0,
                        correta: 0,
                        alternativa: "É a extensão dos arquivos javascript",
                      },
                      {
                        id: 2,
                        index: 0,
                        correta: 1,
                        alternativa: "É uma função nativa do React",
                      },
                    ],
                  },
                ],
              },
            ],
            conteudos: [
              {
                id: 1,
                index: 0,
                titulo: "Hooks do React",
                material:
                  '[{"type":"paragraph","children":[{"text":"Fusce nec lorem quis enim bibendum venenatis ac vel orci. Donec euismod lorem mi, eget luctus velit laoreet nec. Vivamus turpis est, maximus eu mi eget, blandit vehicula eros. Vestibulum sit amet ultricies ipsum. Nullam efficitur, nunc eget tempus condimentum, nulla dui tristique nisl, vel lacinia magna mauris ac neque. Sed elit ligula, bibendum id luctus vitae, consequat quis tortor. Ut commodo, justo at venenatis rhoncus, sapien libero semper elit, eget egestas nisi tellus nec magna. Praesent scelerisque volutpat nunc vitae vehicula. Maecenas feugiat vel nunc ut consectetur. Proin porttitor pulvinar lectus. Suspendisse potenti. Aliquam quis ultrices ligula."}]}]',
                videoLink: "",
              },
            ],
          },
          {
            id: 2,
            index: 1,
            titulo: "Módulo 2",
            quizzes: [
              {
                id: 2,
                index: 1,
                titulo: "Componentes do React",
                questoes: [
                  {
                    id: 2,
                    index: 0,
                    pergunta: "Oque é um componente",
                    alternativas: [
                      {
                        id: 3,
                        index: 0,
                        correta: 1,
                        alternativa: "É uma pequena parte de um sistema",
                      },
                      {
                        id: 4,
                        index: 0,
                        correta: 0,
                        alternativa:
                          "É o comando para enviar informação para o console",
                      },
                    ],
                  },
                ],
              },
            ],
            conteudos: [
              {
                id: 2,
                index: 0,
                titulo: "Componentes do React",
                material:
                  '[{"type":"paragraph","children":[{"text":"Nulla accumsan "},{"text":"laoreet ","bold":true},{"text":"felis in tristique. Sed ultricies lobortis neque in luctus. Morbi accumsan, odio ac sodales efficitur, tortor diam feugiat "},{"text":"justo","italic":true},{"text":", vel efficitur justo sapien ut risus. Nam volutpat libero non gravida eleifend. In sed dolor lobortis, bibendum velit et, malesuada odio. Ut fermentum sem vel massa dignissim auctor. Proin posuere, nulla eget posuere fermentum, ipsum justo lobortis elit, a porttitor tellus lorem et tortor."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Donec luctus lorem at efficitur placerat. "},{"text":"Nam ","underline":true},{"text":"et ex "},{"text":"quam. Fusce","underline":true},{"text":" id laoreet justo. Morbi blandit in orci quis ultricies. Quisque ultricies lectus non dui ultricies facilisis ut nec turpis. Integer posuere libero ut nulla rhoncus molestie id in nisi. Sed mauris ante, pellentesque a metus nec, gravida ornare risus."}]}]',
                videoLink: "",
              },
            ],
          },
        ],
      },
    ];

    const courseById = coursesList.filter((course) => course.cur_id === id)[0];
    setCourse(courseById);
  }

  useEffect(() => {
    fakeGetCourseById(route.params.id);
  }, []);

  return (
    <View className="px-4 py-2 mb-12">
      <Text className="text-3xl font-bold mb-4">{course?.cur_titulo}</Text>
      <View>
        {course?.modulos?.map((mod) => {
          return (
            <TouchableOpacity
              key={mod.id}
              className="p-1 rounded-md bg-amber-200/50 mb-4 flex-row items-center justify-between"
              onPress={() => navigation.navigate("module", {module: mod})}
            >
              <View className="flex-row">
                <Ionicons name="library" color={"rgb(245 158 11)"} size={20} />
                <Text className="text-amber-500 text-base font-bold ml-2">
                  {mod.titulo}
                </Text>
              </View>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={"rgb(245 158 11)"}
                // #f5cc84 ou rgb(245 158 11)
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
