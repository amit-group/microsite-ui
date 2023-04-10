$('.am-select2').each(function (i, el) {
  $(el).select2({
    width: '100%',
    multiple: $(el).hasClass('am-select2-multiple'),
    placeholder: $(el).attr('placeholder'),
  })
});