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

		this.board.currentCard = this.deck.DrawCard();

		this.board.PushCard(this.deck.DrawCard(), 1);
		this.board.FUD();
		
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
		this.tableTop = [new Card(0, "minstaVärde"), new Card(Infinity, "StörstaVärde")];
		this.currentCard = new Card(20);
	}

	PushCard(card, pos) {
		this.tableTop.splice(pos, 0, card);
	}

	FUD() {
		document.getElementById("dck").innerHTML = this.currentCard.Display();

		document.getElementById("brd").innerHTML = "";

		for (var i = 0; i < this.tableTop.length; i++) {
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
			return "<div class='playCard'><img class='playCardImg' src='" + this.img + "'></img><button class='playCardInput' onclick='CompareCards(" + id + ")'></button><p class='playCardAnswer'>" + this.answer + "kg-CO2</p></div>";
		}
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
			new Card(10)
			];

		for (var i = 0; i < this.cards.length; i++) {
			this.cards[i].deckId = i;
		}
	}

	DrawCard() {
		return this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0];
	}
}

//PUBLIC

var gc = new GameController;

window.onload = function ()
{
	gc.NewGame(3, 2);
}

function CompareCards(num) {
	if (gc.board.currentCard.answer >= gc.board.tableTop[num].answer && gc.board.currentCard.answer <= gc.board.tableTop[num + 1].answer) {
		console.log("Correct");
		gc.board.PushCard(gc.board.currentCard, num + 1);
	} else {
		console.log("Wrong");
	}

	gc.board.currentCard = gc.deck.DrawCard();
	console.log(gc.board.currentCard);
	gc.board.FUD();
}