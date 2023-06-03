export default class LoboVolador extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "loboVolador");
		scene.add.existing(this);
		this.scene.physics.world.enable(this);
        
		this.flyPath = new Phaser.Curves.Ellipse(x, y, 100, 100);
        /*this.pathIndex es el grado de completitud de dicha trayetoria. 0 será el punto inicial de la trayectoria circular y 1 el punto final.*/
		this.pathIndex = 0;
		this.pathSpeed = 0.005;
		this.pathVector = new Phaser.Math.Vector2();
		/*    • La función getPoint recibe dos parámetros:
        ◦ El primero es el grado de completitud de la trayectoria (el path).
        ◦ El segundo es la variable (this.pathVector) en la que vamos a almacenar las coordenadas correspondientes a ese grado de completitud de la trayectoria.
        */
		this.flyPath.getPoint(0, this.pathVector);
		this.setPosition(this.pathVector.x, this.pathVector.y);
		/*this.path es variable que almacenará las diferentes trayectorias de la avispa (inicialmente dando vueltas, luego en línea recta hacia el player para atacarle y en línea recta hasta su posición original)*/
		this.path = this.flyPath;
		this.patrolCircle = new Phaser.Geom.Circle(0, 0, 256);
		this.attackPath = new Phaser.Curves.Line([0, 0, 0, 0]);
		
		this.on('animationcomplete', this.animationComplete, this);
		this.startPlace = new Phaser.Math.Vector2(this.pathVector.x, this.pathVector.y);
		this.play('loboFly')
		this.setSize(160, 160);
		
		
	}
	update(delta) {
		if (this.state === LoboVolador.VOLANDO) {
			this.checkPlayer();
		  }else if (this.state === LoboVolador.PERSIGUIENDO) {
			this.persiguePlayer(delta)

	}else if (this.state === LoboVolador.VOLVIENDO) {
		this.pathIndex += this.pathSpeed * 2;
				this.path.getPoint(this.pathIndex, this.pathVector);
				this.setPosition(this.pathVector.x, this.pathVector.y);
		if (this.pathIndex >= 1){
				this.continuaVolando();
		  }
	}
	if(this.x < this.scene.player.x){
		this.flipX = true;
	}else{
		this.flipX = false;
	}
}
    checkPlayer (){
		/*Incrementamos pathIndex, que es el coeficiente que indica el grado de completitud de la trayectoria.*/
		this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);
		/*Alimentamos la variable pathVector, que estará en función del grado de completitud de la trayectoria.*/
		this.flyPath.getPoint(this.pathIndex, this.pathVector);
		/*Modificamos la posición del lobo en función de las coordenadas x e y del vector.*/
		this.setPosition(this.pathVector.x, this.pathVector.y);
		//  Actualizamos la posición del círculo que patrulla el lobo para ver si el player se mete dentro
		this.patrolCircle.x = this.x;
		this.patrolCircle.y = this.y;

		// El jugador ha entrado dentro del area de patrulla el lobo?
		const player = this.scene.player;
		if (this.patrolCircle.contains(player.x, player.y)) {
			this.attackPath.p0.set(this.x, this.y);
			this.attackPath.p1.set(player.x, player.y);
			this.path = this.attackPath;
			this.pathIndex = 0;
			this.attackTime = 0;
			this.state = LoboVolador.PERSIGUIENDO;
		}
		 }
		 persiguePlayer(delta) {
			this.attackTime += delta;
			var player = this.scene.player;
			this.attackPath.p1.set(player.x, player.y);
			this.pathIndex += this.pathSpeed * 2;
			this.path.getPoint(this.pathIndex, this.pathVector);
			this.setPosition(this.pathVector.x, this.pathVector.y);
			
			if (this.scene.physics.overlap(this, player) && this.state === 
			LoboVolador.PERSIGUIENDO) {
		    this.play('loboAttack', true)
			this.scene.playerGolpeadoPorLobo();
			}
			
			
		}
		playerGolpeadoPorAvispa(){
			this.player.estaAturdido = true;
			this.player.body.setVelocity(-150,-150);
			this.player.play('caer', true);
		}
		animationComplete(animation, frame, sprite) {
			if (animation.key === 'loboAttack') {
				this.returnHome();
			}
		} 
		returnHome() {
			this.attackPath.p0.set(this.x, this.y);
			this.attackPath.p1.set(this.startPlace.x, this.startPlace.y);
			this.pathIndex = 0;
			this.path.getPoint(this.pathIndex, this.pathVector);
			this.setPosition(this.pathVector.x, this.pathVector.y);
			this.state = LoboVolador.VOLVIENDO;
		}
		continuaVolando () {
			this.state = LoboVolador.VOLANDO;
			this.path = this.flyPath;
        this.pathIndex = 0;
		}
}

	
	  
	  
	LoboVolador.VOLANDO= 0
	LoboVolador.PERSIGUIENDO=1
	LoboVolador.VOLVIENDO=2
  