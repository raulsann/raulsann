// Generated by CoffeeScript 1.3.1
(function() {
  var log;

  log = console.log.bind(console);

  window.CanvasManager = {
    mutex: false,
    ctx: null,
    canvas: null,
    height: 0,
    width: 0,
    inside: false,
    sectionOffsets: [],
    initCanvas: function(id, sections) {
      return this.canvasBrushView = new window.CanvasBrushView({
        el: $("#" + id),
        id: id,
        sections: sections
      });
    },
    cleanCanvas: function() {
      return this.canvasBrushView.clean();
    },
    duplicateLinks: function() {
      return $('#sections a').each(function() {
        var left, link, top;
        link = $(this).clone();
        top = $(this).offset().top;
        left = $(this).offset().left;
        $(link).css('top', top);
        $(link).css('left', left);
        $(link).css('position', 'absolute');
        $(link).addClass('absolute_link');
        return $('body').append($(link));
      });
    },
    scrollArrowEffect: function() {
      var bodyheight, self;
      self = this;
      log(self.sectionsArray);
      bodyheight = $('body').outerHeight();
      $('#arrow').click(function() {
        var arrowOffset, bodyTop, s, windowScroll, _i, _len, _ref, _results;
        if ($(this).hasClass('arrow_rotated')) {
          return $('body').animate({
            scrollTop: 0
          }, 500);
        } else {
          bodyTop = $('body').scrollTop();
          windowScroll = bodyTop + $(window).outerHeight();
          arrowOffset = $(this).offset().top;
          _ref = self.sectionsArray;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            s = _ref[_i];
            if (bodyTop <= s.offset[0] && s.offset[1] <= windowScroll) {
              $('body').animate({
                scrollTop: s.offset[1]
              }, 500);
              break;
            } else if ((s.offset[0] <= arrowOffset && arrowOffset <= s.offset[1])) {
              if (s.offset[0] === bodyTop) {
                $('body').animate({
                  scrollTop: s.offset[1]
                }, 500);
              } else {
                $('body').animate({
                  scrollTop: s.offset[0]
                }, 500);
              }
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      });
      return $(document).scroll(function() {
        var scrolled;
        scrolled = $(window).outerHeight() + $('body').scrollTop();
        if (scrolled === bodyheight) {
          return $('#arrow').addClass('arrow_rotated');
        } else {
          return $('#arrow').removeClass('arrow_rotated');
        }
      });
    },
    init: function() {
      var colors, i, self;
      self = this;
      i = 0;
      colors = [[0, 0, 0], [250, 250, 250], [250, 250, 250], [250, 250, 250], [250, 250, 250], [250, 250, 250], [250, 250, 250], [250, 250, 250], [0, 0, 0], [0, 0, 0]];
      self.sectionsArray = [];
      self.sectionsArray.push({
        'id': $('header').attr('id'),
        'color': colors[i],
        'offset': [$(header).offset().top, $(header).offset().top + $(header).outerHeight()]
      });
      i++;
      $('section').each(function() {
        self.sectionsArray.push({
          'id': $(this).attr('id'),
          'color': colors[i],
          'offset': [$(this).offset().top, $(this).offset().top + $(this).outerHeight()]
        });
        return i++;
      });
      this.initCanvas('bg', self.sectionsArray);
      $('#clean').click(function() {
        return self.cleanCanvas();
      });
      this.duplicateLinks();
      return this.scrollArrowEffect();
    }
  };

  $(document).ready(function() {
    return window.CanvasManager.init();
  });

}).call(this);
