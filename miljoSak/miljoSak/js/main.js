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

		var x = this.deck.cards[Math.random() * (this.deck.cards.length - 1)];
		console.log(x);

		this.board.tableTop.push(x);
	}
}

class Player {
	constructor(setId) {
		this.indexId;
		this.points;
	}
}

class Board {
	constructor() {
		this.tableTop = [];
	}

	FUD() {

		document.getElementById("brd").innerHTML = "";

		for (var i = 0; i < this.tableTop.length; i++) {
			document.getElementById("brd").innerHTML += this.tableTop[i].Display();
		}
	}
}

class Card {
	constructor(setImg, setAnswer) {
		this.deckId;
		this.boardId;
		this.img = "images/cardframe.jpg";
		this.answer = setAnswer;
	}

	Display() {
		return "<div id='card" + id + "'><img src='" + this.img + "'></img><p id='cardAnswer" + id +"'></p></div>";
	}

	ShowAnswer() {
		document.getElementById("cardAnswer" + id).innerHTML = this.answer;
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
				new Card("", 20)
			];
	}
}



var gc = new GameController;