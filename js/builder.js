 Builder = {
 	header : function(){
 		header = $('header');
 		header.splitivity = $('#splitivity-titre');
 		header.coordDown = header.splitivity.outerHeight();
 		header.currPos = header.coorDown;
 		Touch.menu();
 		header.dropTo = function(pos){
 			header.currPos = pos;
 			Animation.dropTo(header, pos);
 		};
 		header.rollTo = function(pos, duree){
 			duree = typeof duree !== 'undefined' ? duree : 500;
 			header.currPos = pos;
 			Animation.rollTo(header, pos, duree);
 		};
 		header.moveTo = function(pos){
 			Animation.dropTo(header, pos, 0);
 		};
 		header.addClass('ombre');
 		setTimeout(function(){header.rollTo(header.coordDown-header.height(), 1000);
	 		setTimeout(function(){header.removeClass('ombre');}, 800);
 		},1300);
 	},
 	container : function(){
 		container = $('#container');
 		container.coordDown = header.coordDown + tabs.outerHeight();
 		container.simple = function(){
			container.load("vueSimple.html #simple", function(){
				setTimeout(function(){
				Builder.iconeNbPersonnes();
				Builder.inputTotal();
			}, 200);
			});
 		};
 		container.details = function(){
			container.load("indexDetails.html #details", function(){
				frais = {};
				personnes = {}
				Builder.boutonFrais();
				Builder.boutonPersonnes();
				
				personnes.bouton.icone = interface_renderListeButtonIcon(document.getElementById('icone-personne-liste'));
				frais.bouton.icone = interface_renderListeButtonIcon(document.getElementById('icone-frais'));
				
				personnes.bouton.icone.tourner = frais.bouton.icone.tourner = function(angle){
						this.animate({"transform":"r"+angle}, 200, "<>");
				};
				
				Builder.listeFrais();
				Builder.listePersonnes();
			});
		};
		container.up = function(){
			Animation.upTo(container, header.coordDown);
		};
		container.down = function(){
			Animation.downTo(container,container.coordDown);
		};

		container.down();
 	},
 	tabs : function(){
	 	tabs = $('.tabs');
		tabs.simple = $('#simple-button');
		tabs.details = $('#details-button');
		tabs.simple.active = true;
		tabs.details.active = false;
		tabs.coordDown = header.coordDown;
		tabs.down = function(){
			Animation.dropTo(tabs, tabs.coordDown);
		};
		tabs.up = function(){
			Animation.rollTo(tabs, 0);
		};
		tabs.down();
		tabs.simple.click(function(){
			if(!tabs.simple.active){
				tabs.details.animate({'width':'35%'},500, 'easeOutElastic', function(){
					tabs.simple.addClass('active');
				});
				tabs.simple.animate({'width':'65%'}, 500,'easeOutElastic', function(){
					tabs.details.removeClass('active');
				});
				tabs.simple.active = true;
				tabs.details.active = false;
				container.simple();
				tabs.down();
				container.down();
			}
		});
		tabs.details.click(function(){
			if(!tabs.details.active){
				tabs.simple.animate({'width':'35%'}, 500,'easeOutElastic', function(){
					tabs.simple.removeClass('active');
				});
				tabs.details.animate({'width':'65%'}, 500,'easeOutElastic', function(){
					tabs.details.addClass('active');
				});
				tabs.details.active = true;
				tabs.simple.active = false;
				container.details();
				tabs.down();
				container.down();
			}
		});
 	},
 	inputTotal : function(){
 		container.simple.total = $('#total > input'); 	},
 	listeFrais : function(){
 		frais.liste = $('#listeFrais');
		frais.liste.active = false;

		$.get("./formulaireFrais.html", function(data){
					frais.liste.html(data);
					Builder.fraisFantome();
		});	

		frais.liste.frais = new Array;
		frais.liste.ajouter = function(el, id){
			Touch.listElement($(el).find('.list-container'));
			$.each(id,function(key,id){
				frais.liste.frais[id] = el;
			});
		};
		frais.liste.getIdByElement = function(el){
			var values = Array;
			$.each(frais.liste.frais, function(key, value){
				if(value == el) values.push(key);
			});
			return values;
		}
		frais.liste.hide();
 	},
 	listePersonnes : function(){
 		personnes.liste = $('#listePersonnes');
		personnes.liste.active = false;

		$.get("./formulairePersonnes.html", function(data){
					personnes.liste.html(data);
					Builder.personneFantome();
		});	
		personnes.liste.personnes = new Array;
		personnes.liste.ajouter = function(el, id){
			Touch.listElement($(el).find('.list-container'));
			personnes.liste.personnes[id] = el;
		};
		personnes.liste.getIdByElement = function(el){
			return personnes.liste.personnes.indexOf(el);
		}
		personnes.liste.hide();
 	},
 	boutonPersonnes : function(){
 		personnes.bouton = $('#bouton-personnes');
		personnes.bouton.active = false;
		personnes.bouton.click(function(){
			if(personnes.bouton.active){
				Interface.fermerListe(personnes);
				personnes.bouton.active = false;
			}
			else{
				Interface.ouvrirListe(personnes)
				personnes.bouton.active = true;
			}
		});
 	},
 	boutonFrais : function(){
 		frais.bouton = $('#bouton-frais');
		frais.bouton.active = false;
		frais.bouton.click(function(){
			if(frais.bouton.active){
				Interface.fermerListe(frais);
				frais.bouton.active = false;		
			}
			else{
				Interface.ouvrirListe(frais);
				frais.bouton.active = true;
			}
		});		
 	},
 	personneFantome : function(){
 		personnes.liste.fantome = $('.personne.fantome');
 		personnes.liste.fantome.nom = personnes.liste.fantome.find("input[name='nomPersonne']");
 		personnes.liste.fantome.total = personnes.liste.fantome.find("div[name='totalPersonne']");
		personnes.liste.fantome.details = personnes.liste.fantome.find("div[name='detailsPersonne']");
		personnes.liste.fantome.supprimerGauche = personnes.liste.fantome.find(".supprimer.left");
		personnes.liste.fantome.supprimerDroit = personnes.liste.fantome.find(".supprimer.right");
		personnes.liste.fantome.container = personnes.liste.fantome.find(".list-container");
		personnes.liste.fantome.moved = false;
 	},
 	fraisFantome : function(){
 		frais.liste.fantome = $('.frais.fantome');
 		frais.liste.fantome.nom = frais.liste.fantome.find("input[name='nomFrais']");
 		frais.liste.fantome.quantite = frais.liste.fantome.find("input[name='quantiteFrais']");
 		frais.liste.fantome.prix = frais.liste.fantome.find("input[name='prixFrais']");
		frais.liste.fantome.moved = false;
 	},
 	iconeNbPersonnes : function(){
 		iconeNbPersonnes = $('#icone-personnes');
		Interface.renderIconeNbPersonne();
		iconeNbPersonnes.label.getText = function(){
			return iconeNbPersonnes.label.attr('text');
		}
		iconeNbPersonnes.label.setText = function(text){
			iconeNbPersonnes.label.attr({'text':text});
		}
		iconeNbPersonnes.click(function(){
			Interface.picker();
		});
		iconeNbPersonnes.up = function(){
			Animation.rollTo(iconeNbPersonnes, $(document).height()*-1+SpinningWheel.swWrapper.offsetTop,200);
			iconeNbPersonnes.addClass('activated');
		};
		iconeNbPersonnes.down = function(){
			Animation.dropTo(iconeNbPersonnes, $(document).height()*-1+SpinningWheel.swWrapper.offsetTop,200);
			iconeNbPersonnes.removeClass('activated');
		};
		iconeNbPersonnes.label.update = function(){
			var valeurAvant = iconeNbPersonnes.label.getText();
			var results = SpinningWheel.getSelectedValues();
			var nbPersonnes = parseInt(results.values.join(''));
		
				if(nbPersonnes <= 1){
					nbPersonnes = 2;
					SpinningWheel.scrollToValue(1,2);
				}
	
			iconeNbPersonnes.label.setText(nbPersonnes);
			// TODO
			calculSimple();

			if(valeurAvant<=nbPersonnes)
				animation_iconeNbPersonnesBounce();
			else
				animation_iconeNbPersonnesShrink();
		};
 	}
 };	