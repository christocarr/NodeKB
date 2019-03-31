$(document).ready(function() {
  $('.delete-article').on('click', function(e) {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: id,
      success: (response) => {
        alert('Deleting Article');
        window.location.href = '/';
      },
      error: (err) => {
        console.error(err);
      }
    });
  });
});