class GameController {
	constructor() {
		this.playTo;

		this.playerNum = 0;
		this.playerTurn = 0;
		this.players = [];

		this.board = new Board();
		this.deck = new Deck();

		this.gameProgress;
	}

	NewGame(setPlayTo = document.getElementById("inPT").value, setPlayers = document.getElementById("inNOP").value) {
		this.playTo = Math.max(1, setPlayTo);
		this.playerNum = Math.max(1, setPlayers);

		this.players = [];
		for (var i = 0; i < this.playerNum; i++) {
			this.players.push(new Player(i));
		}

		this.board.currentCard = this.deck.DrawCard();

		this.board.PushCard(this.deck.DrawCard(), 1);
		this.board.FUD();

		ChatLog("Game Started. <br> " + this.playerNum + " players : " + this.playTo + " points. <hr><br>");
		ChatLog("Player 1 turn.");
	}

	NextPlayerTurn() {
		this.playerTurn++;
		if (this.playerTurn >= this.playerNum) {
			this.playerTurn = 0;
		}

		ChatLog("Player " + (this.playerTurn + 1) + " turn.");
		document.getElementById("plrTrn").innerHTML = "Player: " + (this.playerTurn + 1);
		document.getElementById("plrPnt").innerHTML = "Score: " + this.players[this.playerTurn].points + "/" + this.playTo;
	}
}

class Player {
	constructor(setId) {
		this.id = setId;
		this.points = 0;
	}

	AddPoints(amount = 1) {
		this.points += amount;
	}

	Won() {
		ChatLog("Player " + (this.id + 1) + " Won!");
	}

	CorrectCard() {
		ChatLog("Player " + (this.id + 1) + " placed their card correctly.");
	}

	WrongCard() {
		ChatLog("Player " + (this.id + 1) + " placed their card incorrectly.");
	}
}

class Board {
	constructor() {
		this.tableTop = [new Card(0, "minstaVärde"), new Card(Infinity -1, "StörstaVärde")];
		this.currentCard = new Card(20);
	}

	PushCard(card, pos) {
		this.tableTop.splice(pos, 0, card);
	}

	FUD() {
		document.getElementById("dck").innerHTML = this.currentCard.Display();

		document.getElementById("brd").innerHTML = this.tableTop[0].DisplayStart();

		for (var i = 1; i < this.tableTop.length; i++) {
			document.getElementById("brd").innerHTML += this.tableTop[i].Display(i, i < this.tableTop.length -1);
		}
	}
}

class Card {
	constructor(setAnswer, setImg = "cardframe") {
		this.cardId;

		this.img = "images/" + setImg + ".png";
		this.answer = setAnswer;
	}

	Display(id = undefined, onBoard = false) {
		if (!onBoard) {
			return "<div class='playCard'><img class='playCardImg' src='" + this.img + "'></img></div>";
		} else {
			return "<div class='playCard'><img class='playCardImg' src='" + this.img + "'></img><button class='playCardInput' onclick='CompareCards(" + id + ")'></button><p class='playCardAnswer'>" + this.answer + "KG-CO2</p></div>";
		}
	}

	DisplayStart() {
		return "<div class='playCard'><img class='playCardImg' src='" + this.img + "'></img><button class='playCardInput' onclick='CompareCards(0)'></button></div>";
	}
}

class Deck {
	constructor() {
		this.cards = [];

		this.Init();
	}

	Init() {
		this.cards =
			[
			new Card(10, "miljö_bilTillJobbet"),
			new Card(10, "miljö_FiskFrånNorge"),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10),
			new Card(10)
			];

		for (var i = 0; i < this.cards.length; i++) {
			this.cards[i].deckId = i;
		}
	}

	DrawCard() {
		if (this.cards.length != 0) {
			return this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0];
		} else {
			return new Card(Infinity, "minstaVärde")
		}
	}
}

//PUBLIC

var gc = new GameController;

window.onload = function ()
{
	NewGame(false);
}

function CompareCards(num) {
	if (gc.board.currentCard.answer >= gc.board.tableTop[num].answer && gc.board.currentCard.answer <= gc.board.tableTop[num + 1].answer) {

		gc.board.PushCard(gc.board.currentCard, num + 1);

		gc.players[gc.playerTurn].AddPoints();
		gc.players[gc.playerTurn].CorrectCard();

		if (gc.players[gc.playerTurn].points >= gc.playTo) {
			gc.players[gc.playerTurn].Won();
		}
	} else {
		gc.players[gc.playerTurn].WrongCard();
	}

	ChatLog("Player " + (gc.playerTurn + 1) + " : " + gc.players[gc.playerTurn].points + "/" + gc.playTo + " points. <hr>");

	gc.board.currentCard = gc.deck.DrawCard();
	//console.log(gc.board.currentCard);
	gc.board.FUD();

	setTimeout(gc.NextPlayerTurn(), 5000);
}

function NewGame(ongoingGame = true) {
	document.getElementById("brd").innerHTML = "<input id='inNOP' type='number' placeholder='Antal Spelare' /><input id='inPT' type='number' placeholder='Spela Till' /><button onclick='gc.NewGame()'>Starta Spel</button>";

	if (ongoingGame) {
		document.getElementById("newGame").innerHTML = "<button onclick='ResumeGame()'>Återgå Till Spel</button>";
	} else {
		document.getElementById("newGame").innerHTML = "";
	}
}

function ResumeGame() {
	document.getElementById("newGame").innerHTML = "<button onclick='NewGame()'>Nytt Spel</button>";

	gc.board.FUD(); 
}

function ChatLog(content = "") {
	document.getElementById("chat").innerHTML += content + "<br>";
	document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight);
}

function EnterChat() {
	var chatContent = document.getElementById("chatInput").value;
	ChatLog(chatContent);

	if (chatContent.startsWith("!")) {
		ChatLog("Command");
		if (chatContent.toUpperCase().includes("POINTS")) {
			ChatLog("Points Added");
			gc.players[gc.playerTurn].points++;
		} else {
			ChatLog("Unknonwn Command");
		}
	}
}