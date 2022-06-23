(function () {
  chimangos = [
    {
      nombre: "mati",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "8:30", salida: "14:00" }] },
        { dia: "martes", horario: [{ entrada: "10:00", salida: "13:00" }] },
        { dia: "miercoles", horario: [{ entrada: "11:00", salida: "16:00" }] },
        { dia: "jueves", horario: [{ entrada: "12:00", salida: "17:00" }] },
        { dia: "viernes", horario: [{ entrada: "8:30", salida: "14:00" }] },
      ],
    },
    {
      nombre: "tomi",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "martes", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "miercoles", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "jueves", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "viernes", horario: [{ entrada: "8:30", salida: "17:30" }] },
      ],
    },
    {
      nombre: "rodri",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "martes", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "miercoles", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "jueves", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "viernes", horario: [{ entrada: "8:30", salida: "15:30" }] },
      ],
    },
    {
      nombre: "claudio",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "16:00", salida: "20:00" }] },
        { dia: "martes", horario: [{ entrada: "16:00", salida: "20:00" }] },
        { dia: "miercoles", horario: [{ entrada: "16:00", salida: "20:00" }] },
        { dia: "jueves", horario: [{ entrada: "16:00", salida: "20:00" }] },
        { dia: "viernes", horario: [] },
      ],
    },
    {
      nombre: "nacho",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "8:30", salida: "16:30" }] },
        { dia: "martes", horario: [{ entrada: "8:30", salida: "16:30" }] },
        { dia: "miercoles", horario: [{ entrada: "11:30", salida: "17:00" }] },
        { dia: "jueves", horario: [{ entrada: "8:30", salida: "16:30" }] },
        { dia: "viernes", horario: [{ entrada: "8:30", salida: "13:30" }] },
      ],
    },
    {
      nombre: "angie",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "8:30", salida: "15:30" }] },
        { dia: "martes", horario: [{ entrada: "10:30", salida: "16:30" }] },
        { dia: "miercoles", horario: [{ entrada: "8:30", salida: "13:00" }] },
        { dia: "jueves", horario: [{ entrada: "8:30", salida: "13:00" }] },
        { dia: "viernes", horario: [{ entrada: "8:30", salida: "13:00" }] },
      ],
    },
    {
      nombre: "diego",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "8:30", salida: "16:00" }] },
        { dia: "martes", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "miercoles", horario: [{ entrada: "8:30", salida: "17:30" }] },
        { dia: "jueves", horario: [{ entrada: "8:30", salida: "15:00" }] },
        {
          dia: "viernes",
          horario: [
            { entrada: "8:30", salida: "11:00" },
            { entrada: "13:00", salida: "17:30" },
          ],
        },
      ],
    },
    {
      nombre: "marco",
      horarios: [
        { dia: "lunes", horario: [{ entrada: "8:30", salida: "13:00" }] },
        { dia: "martes", horario: [{ entrada: "8:30", salida: "13:00" }] },
        { dia: "miercoles", horario: [{ entrada: "8:30", salida: "13:00" }] },
        { dia: "jueves", horario: [{ entrada: "8:30", salida: "13:00" }] },
        {
          dia: "viernes",
          horario: [
            { entrada: "8:30", salida: "11:00" },
            { entrada: "13:00", salida: "17:30" },
          ],
        },
      ],
    },
  ];

  var days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  var d = new Date();
  var dayName = days[d.getDay()];

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramDay = urlParams.get("day");

  dayName = paramDay == null ? days[d.getDay()] : paramDay;

  var video = localStorage.getItem("video");
  if (video !== null) {
    document.getElementById("video").src = video;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getLavaplatos() {
    var todayLavaplatos = localStorage.getItem("lavaplatos");
    if (todayLavaplatos !== null) {
      var nombre = todayLavaplatos.split(",")[0];
      var dia = todayLavaplatos.split(",")[1];
      if (dia === dayName) {
        document.getElementById("nombre-" + nombre).innerHTML +=
          " <i class='fa-solid fa-sink ms-2' id='icono-bacha'></i>";
      }
    }
  }

  function getSeLaCome() {
    var todaySeLaCome = localStorage.getItem("seLaCome");
    if (todaySeLaCome !== null) {
      var nombre = todaySeLaCome.split(",")[0];
      var nombreMay = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      var dia = todaySeLaCome.split(",")[1];
      if (dia === dayName) {
        document.getElementById("seLaCome").innerHTML =
          "<i class='fa fa-heart'></i> " + nombreMay + " se la come";
      } else {
        sortSeLaCome();
      }
    } else {
      sortSeLaCome();
    }
  }

  function sortSeLaCome() {
    var resultado = getRandomInt(0, chimangos.length - 1);
    var todaySeLaCome = [chimangos[resultado].nombre, dayName];
    localStorage.setItem("seLaCome", todaySeLaCome);
    getSeLaCome();
  }

  getLavaplatos();
  getSeLaCome();

  var sortLavaPlatos = document.getElementById("sortearLavaplatos");
  sortLavaPlatos.addEventListener("click", function () {
    var resultado = getRandomInt(0, chimangos.length - 1);
    alert(
      "El chimango que hoy lava los platos es: " + chimangos[resultado].nombre
    );

    var todayLavaplatos = [chimangos[resultado].nombre, dayName];

    if (localStorage.getItem("lavaplatos") !== null) {
      document.getElementById("icono-bacha").remove();
    }

    localStorage.setItem("lavaplatos", todayLavaplatos);

    getLavaplatos();
  });

  document.getElementById("nombreDia").innerHTML = dayName;

  function setHorarios(dia) {
    chimangos.forEach((element) => {
      var horario = document.getElementById("horario-" + element.nombre);
      var horario2 = document.getElementById("horario2-" + element.nombre);
      var arrayHorarios = element.horarios[dia].horario;
      if (arrayHorarios.length === 1) {
        var nombre = element.nombre;
        var horarioEntrada = element.horarios[dia].horario[0].entrada;
        var horarioSalida = element.horarios[dia].horario[0].salida;

        var horaEntrada = horarioEntrada.split(":")[0];
        var minEntrada = horarioEntrada.split(":")[1];

        var horaSalida = horarioSalida.split(":")[0];
        var minSalida = horarioSalida.split(":")[1];

        if (minEntrada === "00") {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada)
            .appendChild(divEntrada);
        } else {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada)
            .appendChild(divEntrada);
        }

        if (minSalida === "00") {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida)
            .appendChild(divSalida);
        } else {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida)
            .appendChild(divSalida);
        }

        for (
          let index = parseInt(horaEntrada) + 1;
          index < parseInt(horaSalida);
          index++
        ) {
          const divDurante = document.createElement("div");
          divDurante.className = "hour-during color-" + nombre;
          document
            .getElementById("col-" + nombre + "-" + index)
            .appendChild(divDurante);
        }
      } else if (arrayHorarios.length === 2) {
        var nombre = element.nombre;
        var horarioEntrada1 = element.horarios[dia].horario[0].entrada;
        var horarioSalida1 = element.horarios[dia].horario[0].salida;
        var horarioEntrada2 = element.horarios[dia].horario[1].entrada;
        var horarioSalida2 = element.horarios[dia].horario[1].salida;

        var horaEntrada1 = horarioEntrada1.split(":")[0];
        var minEntrada1 = horarioEntrada1.split(":")[1];
        var horaEntrada2 = horarioEntrada2.split(":")[0];
        var minEntrada2 = horarioEntrada2.split(":")[1];

        var horaSalida1 = horarioSalida1.split(":")[0];
        var minSalida1 = horarioSalida1.split(":")[1];
        var horaSalida2 = horarioSalida2.split(":")[0];
        var minSalida2 = horarioSalida2.split(":")[1];

        if (minEntrada1 === "00") {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada1;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada1)
            .appendChild(divEntrada);
        } else {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada1;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada1)
            .appendChild(divEntrada);
        }

        if (minSalida1 === "00") {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida1;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida1)
            .appendChild(divSalida);
        } else {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida1;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida1)
            .appendChild(divSalida);
        }

        for (
          let index = parseInt(horaEntrada1) + 1;
          index < parseInt(horaSalida1);
          index++
        ) {
          console.log(index);
          const divDurante = document.createElement("div");
          divDurante.className = "hour-during color-" + nombre;
          document
            .getElementById("col-" + nombre + "-" + index)
            .appendChild(divDurante);
        }

        if (minEntrada2 === "00") {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada2;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada2)
            .appendChild(divEntrada);
        } else {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada2;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada2)
            .appendChild(divEntrada);
        }

        if (minSalida2 === "00") {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida2;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida2)
            .appendChild(divSalida);
        } else {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida2;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida2)
            .appendChild(divSalida);
        }

        for (
          let index = parseInt(horaEntrada2) + 1;
          index < parseInt(horaSalida2);
          index++
        ) {
          console.log(index);
          const divDurante = document.createElement("div");
          divDurante.className = "hour-during color-" + nombre;
          document
            .getElementById("col-" + nombre + "-" + index)
            .appendChild(divDurante);
        }
      }
    });
  }

  switch (dayName) {
    case "Lunes":
      setHorarios(0);
      break;
    case "Martes":
      setHorarios(1);
      break;
    case "Miercoles":
      setHorarios(2);
      break;
    case "Jueves":
      setHorarios(3);
      break;
    case "Viernes":
      setHorarios(4);
      break;
  }
  // Schedule Template - by CodyHouse.co
  function ScheduleTemplate(element) {
    this.element = element;
    this.timelineItems = this.element
      .getElementsByClassName("cd-schedule__timeline")[0]
      .getElementsByTagName("li");
    this.timelineStart = getScheduleTimestamp(
      this.timelineItems[0].textContent
    );
    this.timelineUnitDuration =
      getScheduleTimestamp(this.timelineItems[1].textContent) -
      getScheduleTimestamp(this.timelineItems[0].textContent);

    this.topInfoElement = this.element.getElementsByClassName(
      "cd-schedule__top-info"
    )[0];
    this.singleEvents =
      this.element.getElementsByClassName("cd-schedule__event");

    this.modal = this.element.getElementsByClassName("cd-schedule-modal")[0];
    this.modalHeader = this.element.getElementsByClassName(
      "cd-schedule-modal__header"
    )[0];
    this.modalHeaderBg = this.element.getElementsByClassName(
      "cd-schedule-modal__header-bg"
    )[0];
    this.modalBody = this.element.getElementsByClassName(
      "cd-schedule-modal__body"
    )[0];
    this.modalBodyBg = this.element.getElementsByClassName(
      "cd-schedule-modal__body-bg"
    )[0];
    this.modalClose = this.modal.getElementsByClassName(
      "cd-schedule-modal__close"
    )[0];
    this.modalDate = this.modal.getElementsByClassName(
      "cd-schedule-modal__date"
    )[0];
    this.modalEventName = this.modal.getElementsByClassName(
      "cd-schedule-modal__name"
    )[0];
    this.coverLayer = this.element.getElementsByClassName(
      "cd-schedule__cover-layer"
    )[0];

    this.modalMaxWidth = 800;
    this.modalMaxHeight = 480;

    this.animating = false;
    this.supportAnimation = Util.cssSupports("transition");

    this.initSchedule();
  }

  ScheduleTemplate.prototype.initSchedule = function () {
    this.scheduleReset();
    this.initEvents();
  };

  ScheduleTemplate.prototype.scheduleReset = function () {
    // according to the mq value, init the style of the template
    var mq = this.mq(),
      loaded = Util.hasClass(this.element, "js-schedule-loaded"),
      modalOpen = Util.hasClass(this.modal, "cd-schedule-modal--open");
    if (mq == "desktop" && !loaded) {
      Util.addClass(this.element, "js-schedule-loaded");
      this.placeEvents();
      modalOpen && this.checkEventModal(modalOpen);
    } else if (mq == "mobile" && loaded) {
      //in this case you are on a mobile version (first load or resize from desktop)
      Util.removeClass(this.element, "cd-schedule--loading js-schedule-loaded");
      this.resetEventsStyle();
      modalOpen && this.checkEventModal();
    } else if (mq == "desktop" && modalOpen) {
      //on a mobile version with modal open - need to resize/move modal window
      this.checkEventModal(modalOpen);
      Util.removeClass(this.element, "cd-schedule--loading");
    } else {
      Util.removeClass(this.element, "cd-schedule--loading");
    }
  };

  ScheduleTemplate.prototype.resetEventsStyle = function () {
    // remove js style applied to the single events
    for (var i = 0; i < this.singleEvents.length; i++) {
      this.singleEvents[i].removeAttribute("style");
    }
  };

  ScheduleTemplate.prototype.placeEvents = function () {
    // on big devices - place events in the template according to their time/day
    var self = this,
      slotHeight = this.topInfoElement.offsetHeight;
    for (var i = 0; i < this.singleEvents.length; i++) {
      var anchor = this.singleEvents[i].getElementsByTagName("a")[0];
      var start = getScheduleTimestamp(anchor.getAttribute("data-start")),
        duration =
          getScheduleTimestamp(anchor.getAttribute("data-end")) - start;

      var eventTop =
          (slotHeight * (start - self.timelineStart)) /
          self.timelineUnitDuration,
        eventHeight = (slotHeight * duration) / self.timelineUnitDuration;

      this.singleEvents[i].setAttribute(
        "style",
        "top: " + (eventTop - 1) + "px; height: " + (eventHeight + 1) + "px"
      );
    }

    Util.removeClass(this.element, "cd-schedule--loading");
  };

  ScheduleTemplate.prototype.initEvents = function () {
    var self = this;
    for (var i = 0; i < this.singleEvents.length; i++) {
      // open modal when user selects an event
      this.singleEvents[i].addEventListener("click", function (event) {
        event.preventDefault();
        if (!self.animating) self.openModal(this.getElementsByTagName("a")[0]);
      });
    }
    //close modal window
    this.modalClose.addEventListener("click", function (event) {
      event.preventDefault();
      if (!self.animating) self.closeModal();
    });
    this.coverLayer.addEventListener("click", function (event) {
      event.preventDefault();
      if (!self.animating) self.closeModal();
    });
  };

  ScheduleTemplate.prototype.openModal = function (target) {
    var self = this;
    var mq = self.mq();
    this.animating = true;

    //update event name and time
    this.modalEventName.textContent =
      target.getElementsByTagName("em")[0].textContent;
    this.modalDate.textContent =
      target.getAttribute("data-start") +
      " - " +
      target.getAttribute("data-end");
    this.modal.setAttribute("data-event", target.getAttribute("data-event"));

    //update event content
    this.loadEventContent(target.getAttribute("data-content"));

    Util.addClass(this.modal, "cd-schedule-modal--open");

    setTimeout(function () {
      //fixes a flash when an event is selected - desktop version only
      Util.addClass(target.closest("li"), "cd-schedule__event--selected");
    }, 10);

    if (mq == "mobile") {
      self.modal.addEventListener("transitionend", function cb() {
        self.animating = false;
        self.modal.removeEventListener("transitionend", cb);
      });
    } else {
      var eventPosition = target.getBoundingClientRect(),
        eventTop = eventPosition.top,
        eventLeft = eventPosition.left,
        eventHeight = target.offsetHeight,
        eventWidth = target.offsetWidth;

      var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

      var modalWidth =
          windowWidth * 0.8 > self.modalMaxWidth
            ? self.modalMaxWidth
            : windowWidth * 0.8,
        modalHeight =
          windowHeight * 0.8 > self.modalMaxHeight
            ? self.modalMaxHeight
            : windowHeight * 0.8;

      var modalTranslateX = parseInt(
          (windowWidth - modalWidth) / 2 - eventLeft
        ),
        modalTranslateY = parseInt((windowHeight - modalHeight) / 2 - eventTop);

      var HeaderBgScaleY = modalHeight / eventHeight,
        BodyBgScaleX = modalWidth - eventWidth;

      //change modal height/width and translate it
      self.modal.setAttribute(
        "style",
        "top:" +
          eventTop +
          "px;left:" +
          eventLeft +
          "px;height:" +
          modalHeight +
          "px;width:" +
          modalWidth +
          "px;transform: translateY(" +
          modalTranslateY +
          "px) translateX(" +
          modalTranslateX +
          "px)"
      );
      //set modalHeader width
      self.modalHeader.setAttribute("style", "width:" + eventWidth + "px");
      //set modalBody left margin
      self.modalBody.setAttribute("style", "margin-left:" + eventWidth + "px");
      //change modalBodyBg height/width ans scale it
      self.modalBodyBg.setAttribute(
        "style",
        "height:" +
          eventHeight +
          "px; width: 1px; transform: scaleY(" +
          HeaderBgScaleY +
          ") scaleX(" +
          BodyBgScaleX +
          ")"
      );
      //change modal modalHeaderBg height/width and scale it
      self.modalHeaderBg.setAttribute(
        "style",
        "height: " +
          eventHeight +
          "px; width: " +
          eventWidth +
          "px; transform: scaleY(" +
          HeaderBgScaleY +
          ")"
      );

      self.modalHeaderBg.addEventListener("transitionend", function cb() {
        //wait for the  end of the modalHeaderBg transformation and show the modal content
        self.animating = false;
        Util.addClass(self.modal, "cd-schedule-modal--animation-completed");
        self.modalHeaderBg.removeEventListener("transitionend", cb);
      });
    }

    //if browser do not support transitions -> no need to wait for the end of it
    this.animationFallback();
  };

  ScheduleTemplate.prototype.closeModal = function () {
    var self = this;
    var mq = self.mq();

    var item = self.element.getElementsByClassName(
        "cd-schedule__event--selected"
      )[0],
      target = item.getElementsByTagName("a")[0];

    this.animating = true;

    if (mq == "mobile") {
      Util.removeClass(this.modal, "cd-schedule-modal--open");
      self.modal.addEventListener("transitionend", function cb() {
        Util.removeClass(self.modal, "cd-schedule-modal--content-loaded");
        Util.removeClass(item, "cd-schedule__event--selected");
        self.animating = false;
        self.modal.removeEventListener("transitionend", cb);
      });
    } else {
      var eventPosition = target.getBoundingClientRect(),
        eventTop = eventPosition.top,
        eventLeft = eventPosition.left,
        eventHeight = target.offsetHeight,
        eventWidth = target.offsetWidth;

      var modalStyle = window.getComputedStyle(self.modal),
        modalTop = Number(modalStyle.getPropertyValue("top").replace("px", "")),
        modalLeft = Number(
          modalStyle.getPropertyValue("left").replace("px", "")
        );

      var modalTranslateX = eventLeft - modalLeft,
        modalTranslateY = eventTop - modalTop;

      Util.removeClass(
        this.modal,
        "cd-schedule-modal--open cd-schedule-modal--animation-completed"
      );

      //change modal width/height and translate it
      self.modal.style.width = eventWidth + "px";
      self.modal.style.height = eventHeight + "px";
      self.modal.style.transform =
        "translateX(" +
        modalTranslateX +
        "px) translateY(" +
        modalTranslateY +
        "px)";
      //scale down modalBodyBg element
      self.modalBodyBg.style.transform = "scaleX(0) scaleY(1)";
      //scale down modalHeaderBg element
      // self.modalHeaderBg.setAttribute('style', 'transform: scaleY(1)');
      self.modalHeaderBg.style.transform = "scaleY(1)";

      self.modalHeaderBg.addEventListener("transitionend", function cb() {
        //wait for the  end of the modalHeaderBg transformation and reset modal style
        Util.addClass(self.modal, "cd-schedule-modal--no-transition");
        setTimeout(function () {
          self.modal.removeAttribute("style");
          self.modalBody.removeAttribute("style");
          self.modalHeader.removeAttribute("style");
          self.modalHeaderBg.removeAttribute("style");
          self.modalBodyBg.removeAttribute("style");
        }, 10);
        setTimeout(function () {
          Util.removeClass(self.modal, "cd-schedule-modal--no-transition");
        }, 20);
        self.animating = false;
        Util.removeClass(self.modal, "cd-schedule-modal--content-loaded");
        Util.removeClass(item, "cd-schedule__event--selected");
        self.modalHeaderBg.removeEventListener("transitionend", cb);
      });
    }

    //if browser do not support transitions -> no need to wait for the end of it
    this.animationFallback();
  };

  ScheduleTemplate.prototype.checkEventModal = function (modalOpen) {
    // this function is used on resize to reset events/modal style
    this.animating = true;
    var self = this;
    var mq = this.mq();
    if (mq == "mobile") {
      //reset modal style on mobile
      self.modal.removeAttribute("style");
      self.modalBody.removeAttribute("style");
      self.modalHeader.removeAttribute("style");
      self.modalHeaderBg.removeAttribute("style");
      self.modalBodyBg.removeAttribute("style");
      Util.removeClass(self.modal, "cd-schedule-modal--no-transition");
      self.animating = false;
    } else if (mq == "desktop" && modalOpen) {
      Util.addClass(
        self.modal,
        "cd-schedule-modal--no-transition cd-schedule-modal--animation-completed"
      );
      var item = self.element.getElementsByClassName(
          "cd-schedule__event--selected"
        )[0],
        target = item.getElementsByTagName("a")[0];

      var eventPosition = target.getBoundingClientRect(),
        eventTop = eventPosition.top,
        eventLeft = eventPosition.left,
        eventHeight = target.offsetHeight,
        eventWidth = target.offsetWidth;

      var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

      var modalWidth =
          windowWidth * 0.8 > self.modalMaxWidth
            ? self.modalMaxWidth
            : windowWidth * 0.8,
        modalHeight =
          windowHeight * 0.8 > self.modalMaxHeight
            ? self.modalMaxHeight
            : windowHeight * 0.8;

      var HeaderBgScaleY = modalHeight / eventHeight,
        BodyBgScaleX = modalWidth - eventWidth;

      setTimeout(function () {
        self.modal.setAttribute(
          "style",
          "top:" +
            (windowHeight / 2 - modalHeight / 2) +
            "px;left:" +
            (windowWidth / 2 - modalWidth / 2) +
            "px;height:" +
            modalHeight +
            "px;width:" +
            modalWidth +
            "px;transform: translateY(0) translateX(0)"
        );
        //change modal modalBodyBg height/width
        self.modalBodyBg.style.height = modalHeight + "px";
        self.modalBodyBg.style.transform =
          "scaleY(1) scaleX(" + BodyBgScaleX + ")";
        self.modalBodyBg.style.width = "1px";
        //set modalHeader width
        self.modalHeader.setAttribute("style", "width:" + eventWidth + "px");
        //set modalBody left margin
        self.modalBody.setAttribute(
          "style",
          "margin-left:" + eventWidth + "px"
        );
        //change modal modalHeaderBg height/width and scale it
        self.modalHeaderBg.setAttribute(
          "style",
          "height: " +
            eventHeight +
            "px;width:" +
            eventWidth +
            "px; transform:scaleY(" +
            HeaderBgScaleY +
            ");"
        );
      }, 10);

      setTimeout(function () {
        Util.removeClass(self.modal, "cd-schedule-modal--no-transition");
        self.animating = false;
      }, 20);
    }
  };

  ScheduleTemplate.prototype.loadEventContent = function (content) {
    // load the content of an event when user selects it
    var self = this;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          self.modal.getElementsByClassName(
            "cd-schedule-modal__event-info"
          )[0].innerHTML = self.getEventContent(httpRequest.responseText);
          Util.addClass(self.modal, "cd-schedule-modal--content-loaded");
        }
      }
    };
    httpRequest.open("GET", content + ".html");
    httpRequest.send();
  };

  ScheduleTemplate.prototype.getEventContent = function (string) {
    // reset the loaded event content so that it can be inserted in the modal
    var div = document.createElement("div");
    div.innerHTML = string.trim();
    return div.getElementsByClassName("cd-schedule-modal__event-info")[0]
      .innerHTML;
  };

  ScheduleTemplate.prototype.animationFallback = function () {
    if (!this.supportAnimation) {
      // fallback for browsers not supporting transitions
      var event = new CustomEvent("transitionend");
      self.modal.dispatchEvent(event);
      self.modalHeaderBg.dispatchEvent(event);
    }
  };

  ScheduleTemplate.prototype.mq = function () {
    //get MQ value ('desktop' or 'mobile')
    var self = this;
    return window
      .getComputedStyle(this.element, "::before")
      .getPropertyValue("content")
      .replace(/'|"/g, "");
  };

  function getScheduleTimestamp(time) {
    //accepts hh:mm format - convert hh:mm to timestamp
    time = time.replace(/ /g, "");
    var timeArray = time.split(":");
    var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    return timeStamp;
  }

  var scheduleTemplate = document.getElementsByClassName("js-cd-schedule"),
    scheduleTemplateArray = [],
    resizing = false;
  if (scheduleTemplate.length > 0) {
    // init ScheduleTemplate objects
    for (var i = 0; i < scheduleTemplate.length; i++) {
      (function (i) {
        scheduleTemplateArray.push(new ScheduleTemplate(scheduleTemplate[i]));
      })(i);
    }

    window.addEventListener("resize", function (event) {
      // on resize - update events position and modal position (if open)
      if (!resizing) {
        resizing = true;
        !window.requestAnimationFrame
          ? setTimeout(checkResize, 250)
          : window.requestAnimationFrame(checkResize);
      }
    });

    window.addEventListener("keyup", function (event) {
      // close event modal when pressing escape key
      if (
        (event.keyCode && event.keyCode == 27) ||
        (event.key && event.key.toLowerCase() == "escape")
      ) {
        for (var i = 0; i < scheduleTemplateArray.length; i++) {
          scheduleTemplateArray[i].closeModal();
        }
      }
    });

    function checkResize() {
      for (var i = 0; i < scheduleTemplateArray.length; i++) {
        scheduleTemplateArray[i].scheduleReset();
      }
      resizing = false;
    }
  }
})();
