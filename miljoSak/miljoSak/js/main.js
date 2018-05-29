class GameController {
	constructor() {
		this.playTo;
		this.playerNum;
		this.playerTurn;
		this.players = [];

		this.board = new Board();
		this.deck = new Deck();
	}

	NewGame(setPlayTo, setPlayers) {
		this.playTo = setPlayTo;
		this.playerNum = setPlayers;

		this.players = [];
		for (var i = 0; i < this.playerNum.length; i++) {
			this.players.push(new Player(i));
		}

		this.board.tableTop.push(this.deck.cards[Math.round(Math.random() * (this.deck.cards.length - 1))]);
		this.board.Table();

		this.deck.cards[Math.round(Math.random() * (this.deck.cards.length - 1))];

		this.deck.DrawCard();
	}

	NextPlayerTurn() {

	}
}

class Player {
	constructor(setId) {
		this.indexId;
		this.points;

		this.card;
	}
}

class Board {
	constructor() {
		this.tableTop = [];
	}

	Table() {

		document.getElementById("brd").innerHTML = this.BoardSetUpMin();
		this.tableTop = [new Card(0, "minstaVärde.png")];

		for (var i = 1; i < this.tableTop.length; i++) {
			document.getElementById("brd").innerHTML += this.tableTop[i].Display(i);
			this.tableTop[i].ShowAnswer();
		}

		document.getElementById("brd").innerHTML += this.BoardSetUpMax();
		this.tableTop[this.tableTop.length] = new Card(Infinity, "StörstaVärde.png");
	}

	BoardSetUpMin() {
		return "<div id='cardMIN' class='playCard'><img class='playCardImg' src='images/minstaVärde.png'></img><button class='playCardInput'></button></div>";
	}

	BoardSetUpMax() {
		return "<div id='cardMAX' class='playCard'><img class='playCardImg' src='images/StörstaVärde.png'></img></div>";
	}

	Debugfunc() {
		console.log(this.tableTop);
	}
}

class Card {
	constructor(setAnswer, setImg = "cardframe.jpg") {
		this.deckId;
		this.boardId;

		this.img = "images/" + setImg;
		this.answer = setAnswer;
	}

	Display(id = this.boardId) {
		return "<div id='card" + id + "' class='playCard'><img class='playCardImg' src='" + this.img + "'></img><p id='cardAnswer" + id + "' class='playCardAnswer'></p></div>";
	}

	ShowAnswer() {
		document.getElementById("card" + this.boardId).innerHTML += "<button class='playCardInput' onClick='CompareCards()'></button>";
		document.getElementById("cardAnswer" + this.boardId).innerHTML = this.answer + "kg-CO";
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
			new Card(20),
			new Card(40)
			];

		for (var i = 0; i < this.cards.length; i++) {
			this.cards[i].deckId = i;
		}
	}

	DrawCard() {
		var unUsedId = Math.round(Math.random() * (this.cards.length - 1));

		for (var i = 0; i < gc.board.tableTop.length; i++) {
			if (unUsedId == gc.board.tableTop[i].deckId) {

			}
		}

		document.getElementById("dck").innerHTML = this.cards[unUsedId].Display();
	}
}



var gc = new GameController;

window.onload = function ()
{
	gc.NewGame(3, 2);
}

function CompareCards(num) {
	if (num > gc.board.tableTop[num] && card < gc.board.tableTop[num +1]) {
		console.log("Correct");
	}
}