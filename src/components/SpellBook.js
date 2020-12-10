import React , { useState } from "react";
import { Container, Form, Modal, Button, Header } from "semantic-ui-react";
import {useFirestore} from "reactfire";
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

function SpellBook(props) {
    const firestore = useFirestore();       
    const loadSpells = () => {
        let spells = [];
        let tempSpell = new Spell("testi", false,"testitaika","kuvaus");
        spells.push(tempSpell);
        return spells;
    }


    
    //let spells = this.loadSpells();
        const [spells, setSpells] = useState(loadSpells());
       // setSpells(loadSpells());
    
    
    const AddSpell = (spell) => {
        console.log("adding spell");    
        if (spell === undefined) return; 
        let spellcopy = Array.from(spells);
        spellcopy.push(spell);
        setSpells(spellcopy);
    }

 
        let list = spells?.map((elem, i) => {
            return <ShowSpellModal spell={elem}/>
        });

        if (list === undefined || list.length < 1) {
            return <Container>No spells entered</Container>
        } else {
            return <Container >
            <h2> Known spells: </h2>
            {list}
            <AddSpellForm AddSpell={e => AddSpell(e)} />
        </Container>

        }

    
}

const ShowSpellModal = (props) => {
    const [open, setOpen] = React.useState(false)

    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
    trigger={<Button>{props.spell.name ?? "Unkown spell"}</Button>}
      >
        <Modal.Header>{props.spell.name ?? "Unknown spell"}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{props.spell.name ?? "Unknown spell"}</Header>
            <p>
                {props.spell.description ?? "No description given."}
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Ok"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }

const AddSpellForm = (props) => {
    const [name, setName] = useState();
    const [description, setDescrion] = useState();



    return <Form>
        <Form.Group>
            <Form.Input 
                placeholder={"Spell name"}
                name="name"
                value={name ?? ""} 
                onChange={e=>setName(e.target.value)}/>
            <Form.Input 
                placeholder={"Spell description"}
                name="description"
                value={description ?? ""} 
                onChange={e=>setDescrion(e.target.value)}/>
            <button onClick={e=> props.AddSpell( new Spell(name, false, description, "asd"))}>
                Add a new spell
            </button>
        </Form.Group>
        
    </Form> 
}

export {SpellBook}