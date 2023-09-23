const btnNameGen = $('#modal-cert-generate');
const fieldName = $('#modal-cert-field-name');
const fieldEmail = $('#modal-cert-field-email');

fieldName.on('input', () => {
  const empty = fieldName.val().length == 0;

  btnNameGen.prop('disabled', empty);
});

async function gen_cert(hasName) {
  // If needed we update the name first.

  if (hasName == true) {
    await $.post(
      '/account/update',
      { email: fieldEmail.val(), fullName: fieldName.val() },
      function (response) {
        if (response.status) {
          displayMessages('Done!', 'success', 'Your name has been updated.');
        } else {
          displayMessages('Uh-oh!', 'warning', 'We could not update your name.');
        }
      }
    );
  }

  // We close the modal.
  $('#setNameModal').modal('hide');

  // Then we proceed with the certificate.
  genCertificate('pathway', `${pathCode}`);
}
