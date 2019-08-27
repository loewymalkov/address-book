// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}



// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, newEmail) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.homeEmail = newEmail.homeEmail,
  this.workEmail = newEmail.workEmail
 }


// //
function Email (workEmail, homeEmail) {
  this.workEmail = workEmail,
  this.homeEmail = homeEmail
}




// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactLists = $('ul#contacts');
  var htmlForContactInfo = '';
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += '<li id=' + contact.id + '>' + contact.firstName + ' ' + contact.lastName + '</li>';
  });
  contactLists.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".home-email").html(contact.homeEmail);
  $(".work-email").html(contact.workEmail);
  var buttons = $("#buttons");

  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedWorkEmail = $("input#new-work-email").val();
    var inputtedHomeEmail = $("input#new-home-email").val();
    console.log(inputtedWorkEmail)
    console.log(inputtedHomeEmail)
    // if ($("input#new-work-email").val() === "") {
    //   $(".removeWorkEmail").remove();
    // }
    // if ($("input#new-home-email").val() === "") {
    //   $(".removeHomeEmail").remove();
    // } else {
    //   $(".removeHomeEmail").show();
    //   $(".removeWorkEmail").show();
    // };

    var newEmail = new Email(inputtedWorkEmail, inputtedHomeEmail)
    console.log(newEmail)
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newEmail);
    console.log(newContact)
    // var newEmail = new Contact(inputtedWorkEmail, inputtedHomeEmail);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    console.log(addressBook.contacts);
  });
});
