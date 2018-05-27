class GameController {
	constructor() {
		this.playTo;
		this.playerNum;
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
		this.board.FUD();

		this.deck.cards[Math.round(Math.random() * (this.deck.cards.length - 1))];

		this.deck.DrawCard();
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

	FUD() {
		//this.tableTop.

		document.getElementById("brd").innerHTML = this.BoardSetUpMin();

		for (var i = 0; i < this.tableTop.length; i++) {
			document.getElementById("brd").innerHTML += this.tableTop[i].Display(i);
		}

		document.getElementById("brd").innerHTML += this.BoardSetUpMax();
	}

	BoardSetUpMin() {
		return "<div id='cardMIN' class='playCard'><img class='playCardImg' src='images/cardframe.jpg'></img><button class='playCardInput'></button></div>";
	}

	BoardSetUpMax() {
		return "<div id='cardMAX' class='playCard'><img src='images/cardframe.jpg'></img></div>";
	}
}

class Card {
	constructor(setAnswer, setText, hint = "") {
		this.deckId;
		this.boardId;

		this.text = setText;
		this.hint = "";
		this.img = "images/cardframe.jpg";
		this.answer = setAnswer;
	}

	Display(id) {
		return "<div id='card" + id + "' class='playCard'><img class='playCardImg' src='" + this.img + "'><button class='playCardInput'></button></img><p id='cardAnswer" + id + "' class='playCardAnswer'></p></div>";
	}

	ShowAnswer() {
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
			new Card(20, "Import av x från x"),
			new Card(40, "Åka bensin bil till x, x anlat gånger per år")
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

function CompareCards(minCard, maxCard, card) {
	if (card > minCard && card < maxCard) {
		console.log("Correct");
	}
}