import CardBase, { CardSize } from "../engine/CardBase";

export default class Deck{
    
    /* Array of cards in deck */
    cards: CardBase [];

    x: number;
    y: number;

    constructor(
        x: number,
        y: number
      ) {

        /* Initialize array of cards */
        this.cards = new Array();
        this.x = x;
        this.y = y;
    }

    pushCard(card:CardBase)
    {
        this.cards.push(card);
    }

    popCard()
    {
        return this.cards.pop();
    }

    popCardById(id:number): CardBase
    {
        let index: number = -1;

        for (let i = 0; i < this.cards.length; ++i)
        {
            if (this.cards[i].baseAttr.id === id)
            {
                index = i;   
                break;     
            }
        }

        if (index >= 0)
        {
            let card: CardBase = this.cards[index];
            this.cards.splice(index, 1)
            return card
        }
        else
        {
            throw Error(`Card with ID ${id} not found`)
        }
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

    getSize() {
        if (this.cards.length > 0)
        {
            return this.cards[0].getSize();
        }
        else
        {
            return {width: 0, height: 0} as CardSize;
        }
    }
}