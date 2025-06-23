use candid::{CandidType, Deserialize};
use ic_cdk::{query, update};
use std::cell::RefCell;

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Note {
    title: String,
    content: String,
}

thread_local! {
    static NOTES: RefCell<Vec<Note>> = RefCell::new(Vec::new());
}

#[update]
#[candid::candid_method(update)]
fn add_note(title: String, content: String) {
    NOTES.with(|notes| {
        notes.borrow_mut().push(Note { title, content });
    });
}

#[query]
#[candid::candid_method(query)]
fn get_notes() -> Vec<Note> {
    NOTES.with(|notes| notes.borrow().clone())
}

// Generate .did interface
ic_cdk::export_candid!();
