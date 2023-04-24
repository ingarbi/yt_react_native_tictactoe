import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image
} from "react-native";

export default function App() {
  const [notification, setNotification] = useState("Player X starts");
  const [refresh, setRefresh] = useState(false);
  const [board, setBoard] = useState([
    " "," "," ",
    " "," "," ",
    " "," "," ",
  ]);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const pressField = (index) => {
    let newBoard = board;

    if (newBoard[index] !== "X" && newBoard[index] !== "O") {
      if (currentPlayer == "X") {
        newBoard[index] = "X";
        setCurrentPlayer("O");
        setNotification("Player O turn");
      } else {
        newBoard[index] = "O";
        setCurrentPlayer("X");
        setNotification("Player X turn");
      }

      setBoard(newBoard);
      setRefresh(!refresh);
      checkIfPlayerWin();
    }
  };

  const checkIfPlayerWin = () =>{
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== ' '){
      playerWon(board[0])
    }else if(board[3] === board[4] && board[4] === board[5] && board[5] !== ' '){
      playerWon(board[3])
    }else if(board[6] === board[7] && board[7] === board[8] && board[8] !== ' '){
      playerWon(board[6])
    }else if(board[0] === board[4] && board[4] === board[8] && board[8] !== ' '){
      playerWon(board[0])
    }else if(board[0] === board[3] && board[3] === board[6] && board[6] !== ' '){
      playerWon(board[0])
    }else if(board[1] === board[4] && board[4] === board[7] && board[7] !== ' '){
      playerWon(board[1])
    }else if(board[2] === board[4] && board[4] === board[6] && board[6] !== ' '){
      playerWon(board[2])
    }else if(board[2] === board[5] && board[5] === board[8] && board[8] !== ' '){
      playerWon(board[2])
    }
  };
  const playerWon = (symbol) =>{
    alert("Player " + symbol + " won")
    setBoard([
      " "," "," ",
      " "," "," ",
      " "," "," ",
    ])
    if(symbol =="O"){
      setNotification("X to start")
    }else{
      setNotification("O to start")
    }
  }


  return (
    <View style={styles.container}>
      <Image source={require('./assets/bg2.jpg')} style={styles.image2}/>
      <StatusBar style="auto" />
      <Text style={styles.txt1}>TicTacToe</Text>
      <Text style={styles.txt2}>{notification}</Text>
      
      <View>
      <Image source={require('./assets/bg.png')} style={styles.image}/>
      <FlatList
        style={styles.list}
        data={board}
        numColumns={3}
        extraData={refresh}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.square}
            onPress={() => pressField(index)}
          >
            <Text style={styles.txtXO}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txt1: {
    fontSize: 50,
    position: 'absolute',
    top:60,
    color:"white"
  },
  txt2: {
    fontSize: 20,
    position: 'absolute',
    top:130,
    color:"white"
  },
  txtXO:{
    fontSize: 50,
    color:"white"
  },
  button1: {
    backgroundColor: "blue",
    fontSize: 45,
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  list: {
    width: 300,
    height: 400,
  },
  square: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image2:{
    width:"100%",
    height:"100%",
    position: 'absolute',
    zIndex:-1,
  },
  image:{
    width:300,
    height:300,
    position: 'absolute',

  },
});
