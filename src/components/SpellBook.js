import React from "react";
import { Container } from "semantic-ui-react";

/**
 * Yksinkertainen placeholder spell.
 */
class Spell {
    isSpent = false;
    constructor (name,isLimited, description, effects) {
        this.name = name;
        this.isLimited = isLimited;
        this.description = description;
        this.effects = effects;
    }
    castSpell() {
        if (this.isLimited) this.isSpent = true;
        return this.effects;
    }
}

class SpellBook extends React.Component {
    constructor(props) {
        super(props);
        let spells = this.loadSpells();
        this.state = {
            spells
        };

    }
    
    loadSpells () {
        let spells = [];
        let tempSpell = new Spell("testi", false,"testitaika","kuvaus");
        spells.push(tempSpell);
        return spells;
    }


    render() {
        let list = this.state?.spells?.map((elem, i) => {
            return <button key={elem.name + i} onClick={e =>console.log(elem)}>{elem.name}</button>
        });

        if (list === undefined || list.length < 1) {
            return <Container>No spells entered</Container>
        }

        return <Container >
            {list}
        </Container>
    }
}

export {SpellBook}