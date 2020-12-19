import React , { useState } from "react";
import { Container, Form, Modal, Button, Header } from "semantic-ui-react";
import {useFirestore, useUser} from "reactfire";
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
    
    /**
     * TODO: KORJAA 
     */
    castSpell() {
      console.log("casting spell");
        if (this.isLimited) this.isSpent = true;
        return this.effects;
    }

    toJSON() {
      return {
        name:this.name,
        isLimited: this.isLimited,
        description: this.description,
        effects: this.effects
      }
    }
}

function SpellBook(props) {
    const db = useFirestore();
    const uid = useUser().uid;       

    /**
     * Lataa tiedot firebasesta ja palauttaa ne 
     */
    const loadSpells = () => { 
        let spells = [];
        //let tempSpell = new Spell("testi", true,"testitaika","kuvaus");
        db.collection("users").doc(uid).collection("spells").get().then(snapshot => {
          snapshot.forEach(doc => {
            spells.push(new Spell(doc.name, doc.isLimited, doc.description, doc.effects)); // TODO TÄLLE PAREMPI TAPA
          })
        })
        
        //spells.push(tempSpell);
        return spells;
    }

    const [spells, setSpells] = useState(loadSpells());
        
    const AddSpell = (spell) => {
        console.log("adding spell");    
        if (spell === undefined) return; 
        let spellcopy = Array.from(spells);
        spellcopy.push(spell);
        setSpells(spellcopy);

        const spellref = db.collection("users").doc(uid).collection("spells");
        spellref.add(spell.toJSON());
    }

    //TODO KORJAA ui:n päivittyminen
    const resetCastStatus = () => {
      let spellcopy = Array.from(spells);
      spellcopy.forEach((spell, i) => {
        spell.isSpent = false;
      });
      setSpells(spellcopy);
    }

        let list = spells?.map((elem, i) => {
            return <ShowSpellModal key={elem.name+i + elem.isLimited + ""} spell={elem}/>
        });

        if (list === undefined || list.length < 1) {
            return <Container><AddSpellForm AddSpell={e => AddSpell(e)} /></Container>
        } else {
            return <Container >
            <h2> Known spells: </h2>
            {list}
            <p>
              <Button onClick={e => resetCastStatus()}>Long rest | reset cast status</Button>
            </p>
            <AddSpellForm AddSpell={e => AddSpell(e)} />
        </Container>

        }

    
}

const ShowSpellModal = (props) => {
    const [open, setOpen] = React.useState(false)
    const [disabled, setDisabled] = React.useState(props.spell.isSpent);

    return (
      <div> 

      <Button attached={"left"} disabled={disabled} onClick={e=>{ 
        if (props.spell.isLimited === true) setDisabled(true);
        props.spell.castSpell()
      } }>
        Cast
      </Button>

      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button attached={"right"}>{props.spell.name ?? "Unkown spell"}</Button>}
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

      </div>
    )
  }

const AddSpellForm = (props) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [limited, setLimited] = useState(false);

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
                onChange={e=>setDescription(e.target.value)}/>
              <Form.Checkbox 
                label="Limited"
                name="isLimited"
                checked={limited}
                onChange={e=> setLimited(limited ? false : true)} />
            <button onClick={e=> props.AddSpell( new Spell(name, limited, description, "asd"))}>
                Add a new spell
            </button>
        </Form.Group>
        
    </Form> 
}

export {SpellBook}