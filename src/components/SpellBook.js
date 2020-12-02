import React from "react";
import { Container } from "semantic-ui-react";

/**
 * Yksinkertainen placeholder spell.
 */
class Spell {
    isSpent = false;
    selected = true;
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

        this.AddSpell = this.AddSpell.bind(this);
    }
    
    loadSpells () {
        let spells = [];
        let tempSpell = new Spell("testi", false,"testitaika","kuvaus");
        spells.push(tempSpell);
        return spells;
    }

    AddSpell(spell) {
        console.log("adding spell");    
        if (spell === undefined) return; 
        let spells = this.state.spells;
        spells.push(spell);
        this.setState({
            spells:spells
        })
    }

    render() {
        let list = this.state?.spells?.map((elem, i) => {
            return <button key={elem.name + i} onClick={e =>console.log(elem)}>{elem.name}</button>
        });

        if (list === undefined || list.length < 1) {
            return <Container>No spells entered</Container>
        }

        return <Container >
            <h2> Known spells: </h2>
            {list}
            <AddSpellForm AddSpell={this.AddSpell} />
        </Container>
    }
}

const AddSpellForm = (props) => {
    return <div >
        <button onClick={e=> props.AddSpell()}>
            Add a new spell
        </button>
    </div> 
}

export {SpellBook}