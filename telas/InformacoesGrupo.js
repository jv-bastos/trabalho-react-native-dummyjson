import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';

export default function InformacoesGrupo() {
  return (
    <ImageBackground
      source={require('../assets/fundoLogin.jpg')}       
      style={estilos.container}     
    >
      <View style={estilos.conteudo}>

        <Text style={estilos.descricao}>
          Este projeto foi desenvolvido para o trabalho avaliativo da G1 da disciplina de Projeto, Design e Engenharia de Processos.
        </Text>

        <Text style={estilos.titulo}>Integrantes:</Text>

        <Text style={estilos.descricao}>João Vitor Bastos dos Santos - RA: 1136345</Text>
        <Text style={estilos.descricao}>Leonardo Ross Dapper - RA: 1136153</Text>
        <Text style={estilos.descricao}>Eduardo Cardoso Debona - RA: 1121865</Text>
        <Text style={estilos.descricao}>Roan Pablo Bortolini - RA: 1139707</Text>
        <Text style={estilos.descricao}>Vinicius Gehring Capellari - RA: 1138972</Text>
      </View>
    </ImageBackground>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop:
    Platform.select({
     ios: 120,
     android: 140
    })
  },

  titulo: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 5,
    margin: 25
  },

  descricao: {
    fontFamily: 'NovaSquare',
    color: 'white',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'left',
    marginBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 3
  },
});