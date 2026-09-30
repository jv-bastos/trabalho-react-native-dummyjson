import { StyleSheet, Text, View } from 'react-native';

export default function InformacoesGrupo() {
  return (
    <View>
      <Text style={estilos.titulo}>Informações do Grupo</Text>

      <Text style={estilos.descricao}>
        Este aplicativo foi desenvolvido para o trabalho avaliativo da G1 da disciplina de Projeto, Design e Engenharia de Processos.
      </Text>

      <Text style={estilos.subtitulo}>Integrantes:</Text>

      <Text style={estilos.integrante}>João Vitor Bastos dos Santos - RA: 1136345</Text>
      <Text style={estilos.integrante}>Nome do Integrante 2 - RA: 000000</Text>
      <Text style={estilos.integrante}>Nome do Integrante 3 - RA: 000000</Text>
      <Text style={estilos.integrante}>Nome do Integrante 4 - RA: 000000</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  descricao: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  integrante: {
    fontSize: 16,
    marginBottom: 10,
  },
});