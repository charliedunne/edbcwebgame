import CardBase from "../engine/CardBase";

export default class Deck extends Phaser.GameObjects.Container {
    
    /* Array of cards in deck */
    cards: CardBase [];

    
    constructor(
        scene: Phaser.Scene,
      ) {
        /* Call super */
        super(scene, 0, 0);

        /* Initialize array of cards */
        this.cards = new Array();
    }

    pushCard(card:CardBase)
    {
        this.cards.push(card);
    }

    popCard()
    {
        return this.cards.pop();
    }

    getCardById(id: number)
    {
        return this.cards[id];
    }

    getLength() {
        return this.cards.length;
    }

    shuffleDeck() {

        for (let i = this.cards.length -1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[i];

            // Swap
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
}