
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import API_URL from "../constants/api";

type Npc = {
  _id: string;
  nome: string;
  vida: number;
  descricao: string;
  campanha: string;
  categoria: string;
};

export default function HomeScreen() {
  const [npcs, setNpcs] = useState<Npc[]>([]);

  const [nome, setNome] = useState("");
  const [vida, setVida] = useState("");
  const [descricao, setDescricao] = useState("");
  const [campanha, setCampanha] = useState("");
  const [categoria, setCategoria] = useState("");

  const [npcEditando, setNpcEditando] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  // Busca os NPCs cadastrados na API
  async function carregarNpcs() {
    try {
      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error("Erro ao buscar NPCs.");
      }

      const dados = await resposta.json();
      setNpcs(dados);
    } catch (erro) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar os NPCs. Verifique o backend."
      );
    }
  }

  useEffect(() => {
    carregarNpcs();
  }, []);

  // Limpa os campos do formulário
  function limparFormulario() {
    setNome("");
    setVida("");
    setDescricao("");
    setCampanha("");
    setCategoria("");
    setNpcEditando(null);
  }

  // Cadastra ou atualiza um NPC
  async function salvarNpc() {
    if (!nome.trim() || !vida.trim() || !descricao.trim()) {
      Alert.alert("Atenção", "Preencha nome, vida e descrição.");
      return;
    }

    const npc = {
      nome: nome.trim(),
      vida: Number(vida),
      descricao: descricao.trim(),
      campanha: campanha.trim(),
      categoria: categoria.trim(),
    };

    if (!Number.isFinite(npc.vida) || npc.vida < 0) {
      Alert.alert("Atenção", "Informe um valor de vida válido.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch(
        npcEditando ? `${API_URL}/${npcEditando}` : API_URL,
        {
          method: npcEditando ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(npc),
        }
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível salvar o NPC.");
      }

      Alert.alert(
        "Sucesso",
        npcEditando
          ? "NPC atualizado!"
          : "NPC cadastrado!"
      );

      limparFormulario();
      await carregarNpcs();
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar o NPC.");
    } finally {
      setCarregando(false);
    }
  }

  // Preenche o formulário para edição
  function editarNpc(npc: Npc) {
    setNome(npc.nome);
    setVida(String(npc.vida));
    setDescricao(npc.descricao);
    setCampanha(npc.campanha || "");
    setCategoria(npc.categoria || "");
    setNpcEditando(npc._id);
  }

  // Exclui um NPC
  function excluirNpc(id: string) {
    Alert.alert(
      "Excluir NPC",
      "Tem certeza que deseja excluir este personagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const resposta = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
              });

              if (!resposta.ok) {
                throw new Error("Erro ao excluir NPC.");
              }

              Alert.alert("Sucesso", "NPC excluído!");
              await carregarNpcs();
            } catch (erro) {
              Alert.alert("Erro", "Não foi possível excluir o NPC.");
            }
          },
        },
      ]
    );
  }

  // Componente visual de cada NPC
  function renderNpc({ item }: { item: Npc }) {
    return (
      <View style={styles.card}>
        <Text style={styles.npcNome}>{item.nome}</Text>

        <Text style={styles.npcInfo}>
          ❤️ Vida: {item.vida}
        </Text>

        <Text style={styles.npcInfo}>
          📖 {item.descricao}
        </Text>

        {item.campanha ? (
          <Text style={styles.npcInfo}>
            🎲 Campanha: {item.campanha}
          </Text>
        ) : null}

        {item.categoria ? (
          <Text style={styles.npcInfo}>
            ⚔️ Categoria: {item.categoria}
          </Text>
        ) : null}

        <View style={styles.botoes}>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => editarNpc(item)}
          >
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => excluirNpc(item._id)}
          >
            <Text style={styles.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      data={npcs}
      keyExtractor={(item) => item._id}
      renderItem={renderNpc}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>NPC HUB</Text>
          <Text style={styles.subtitulo}>
            MINHA biblioteca de personagens de RPG
          </Text>

          <View style={styles.formulario}>
            <Text style={styles.tituloFormulario}>
              {npcEditando ? "Editar NPC" : "Novo NPC"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do NPC"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.input}
              placeholder="Pontos de vida"
              placeholderTextColor="#999"
              value={vida}
              onChangeText={setVida}
              keyboardType="numeric"
            />

            <TextInput
              style={[styles.input, styles.inputGrande]}
              placeholder="Descrição do personagem"
              placeholderTextColor="#999"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <TextInput
              style={styles.input}
              placeholder="Nome da campanha (opcional)"
              placeholderTextColor="#999"
              value={campanha}
              onChangeText={setCampanha}
            />

            <TextInput
              style={styles.input}
              placeholder="Categoria (Aliado, Inimigo...)"
              placeholderTextColor="#999"
              value={categoria}
              onChangeText={setCategoria}
            />

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarNpc}
              disabled={carregando}
            >
              <Text style={styles.textoBotao}>
                {carregando
                  ? "Salvando..."
                  : npcEditando
                  ? "Atualizar NPC"
                  : "Cadastrar NPC"}
              </Text>
            </TouchableOpacity>

            {npcEditando && (
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={limparFormulario}
              >
                <Text style={styles.textoBotao}>Cancelar edição</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.tituloLista}>
            NPCs cadastrados ({npcs.length})
          </Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.vazio}>
          Nenhum NPC cadastrado ainda.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },

  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },

  titulo: {
    color: "#e32636",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 35,
  },

  subtitulo: {
    color: "#BBBBBB",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 5,
  },

  formulario: {
    backgroundColor: "#242424",
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
  },

  tituloFormulario: {
    color: "#e32636",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#353535",
    color: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 15,
  },

  inputGrande: {
    height: 90,
    textAlignVertical: "top",
  },

  botaoSalvar: {
    backgroundColor: "#7c0a02",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },

  botaoCancelar: {
    backgroundColor: "#555555",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  tituloLista: {
    color: "#e32636",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#242424",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#e32636",
  },

  npcNome: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  npcInfo: {
    color: "#CCCCCC",
    fontSize: 14,
    marginBottom: 7,
  },

  botoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: "#426B91",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: "#913F3F",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  vazio: {
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
