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

		//this.board.tableTop.push(this.deck.cards[Math.round(Math.random() * (this.deck.cards.length - 1))]);
		this.board.Table();

		//this.deck.cards[Math.round(Math.random() * (this.deck.cards.length - 1))];

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
		this.currentCard = new Card(20);
	}

	Table() {

		document.getElementById("brd").innerHTML = this.BoardSetUpMin();
		this.tableTop = [new Card(0, "minstaVärde")];
		this.tableTop[0].boardId = 0;

		for (var i = 1; i < this.tableTop.length; i++) {
			document.getElementById("brd").innerHTML += this.tableTop[i].Display(i);
			this.tableTop[i].ShowAnswer();
		}

		document.getElementById("brd").innerHTML += this.BoardSetUpMax();
		this.tableTop.push(new Card(Infinity, "StörstaVärde"));
		this.tableTop[this.tableTop.length -1].boardId = this.tableTop.length - 1;

	}

	BoardSetUpMin() {
		return "<div id='cardMIN' class='playCard'><img class='playCardImg' src='images/minstaVärde.png'></img><button class='playCardInput' onclick='CompareCards(0)'></button></div>";
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

		this.img = "images/" + setImg + ".png";
		this.answer = setAnswer;
	}

	Display(id = this.boardId) {
		return "<div id='card" + id + "' class='playCard'><img class='playCardImg' src='" + this.img + "'></img><p id='cardAnswer" + id + "' class='playCardAnswer'></p></div>";
	}

	ShowAnswer() {
		document.getElementById("card" + this.boardId).innerHTML += "<button class='playCardInput' onclick='CompareCards(" + this.boardId + ")'></button>";
		document.getElementById("cardAnswer" + this.boardId).innerHTML = this.answer + "kg-CO2";
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
			if (unUsedId != gc.board.tableTop[i].deckId) {
				gc.board.tableTop.currentCard = gc.deck.cards[unUsedId];
				document.getElementById("dck").innerHTML = this.cards[unUsedId].Display();
			}
		}

		
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

		console.log(gc.board.tableTop.length - 1 + "||" + gc.board.tableTop[num + 1].boardId);

		for (var i = gc.board.tableTop.length - 1; i >= gc.board.tableTop[num +1].boardId; i--) {
			console.log(i);
			gc.board.tableTop[i] = gc.board.tableTop[i + 1];
			//gc.board.tableTop[i].boardId = i;
		}

		gc.board.tableTop[num + 1] = gc.board.currentCard;
		gc.board.Table();
		
	} else {
		console.log("Wrong");
	}

	gc.deck.DrawCard();
}