import { Component,HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game2048';
  gameOver=false;
  gameWon=false;
  score=0;
  bestScore=0;
  keyMap:any= {
    38: 'Up',
    39: 'Right',
    40: 'Down',
    37: 'Left'
  };
  sourceElements=[2,4]
  previousBestScore=0;
  grid: any[4][4] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  ngOnInit(){
    this.addTwoOrFour(this.grid,this.sourceElements[Math.floor(Math.random() * 2)])
    this.addTwoOrFour(this.grid,this.sourceElements[Math.floor(Math.random() * 2)])
  }
  @HostListener('window:keyup', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    const direction = this.keyMap[event['keyCode']];
    if (direction=='Left'){
      console.log('In Left')
      this.grid=this.moveLeft(this.grid)
      console.log('Out of Left')
      this.gameContinue()
      }
      else if (direction=='Right'){
        console.log('In Right')
        this.grid=this.moveRight(this.grid)
        this.gameContinue()

      }
      else if (direction=='Up'){
        console.log('In Up')
        this.grid=this.moveUp(this.grid)
        this.gameContinue()
      }
      else if (direction=='Down'){
        console.log('In Down')
        this.grid=this.moveDown(this.grid)
        this.gameContinue()
      }
      else{
        console.log('Invalid Key Pressed')
      }
      
  }
gameContinue(){
  console.log('Check Game Status')
  if (this.checkGameStatus(this.grid)=='WON'){
    this.gameWon=true;
    console.log('Game Won')
    this.bestScore=Math.max(this.score,this.previousBestScore)
    this.previousBestScore=this.bestScore
    }
    
    else if (this.checkGameStatus(this.grid)=='LOST'){
    this.gameOver=true;
    console.log('Game Lost')
    this.bestScore=Math.max(this.score,this.previousBestScore)
    this.previousBestScore=this.bestScore
    }
    else  if (this.checkGameStatus(this.grid)=='NOT OVER'){
      console.log('Game not Over')
      if (!this.checkGridFull(this.grid)){
      console.log('Calling add two or four')
        this.addTwoOrFour(this.grid,this.sourceElements[Math.floor(Math.random() * 2)])
        console.log('Grid not Full')
    }
    else{
      console.log('Grid Full')
    }
  }
}

 restartGame(){
   this.gameOver=false;
   this.gameWon=false;
  this.score=0;
  this.grid= [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  this.addTwoOrFour(this.grid,this.sourceElements[Math.floor(Math.random() * 2)])
  this.addTwoOrFour(this.grid,this.sourceElements[Math.floor(Math.random() * 2)])
 }
checkGridFull(grid:any){
  console.log('Checking GRID FULL')
  for(var i=0;i<grid.length;i++){
    for(var j=0;j<grid.length;j++){
      if (grid[i][j]==0){
        console.log('Check Grid Full End in Loop ')
        return false
      }
    }
  }
  console.log('Check Grid Full End Outside ')
  return true
}
 addTwoOrFour(grid:any,no:any){
   let r;
   let c;
    r = Math.floor(Math.random() * 4)
    c =Math.floor(Math.random() * 4)
    while(grid[r][c] != 0){
        r = Math.floor(Math.random() * 4)
        c = Math.floor(Math.random() * 4)
    }
    grid[r][c]=no
 }

checkGameStatus(grid:any){
    for (let i=0;i<grid.length;i++){
      for (let j=0;j<grid.length;j++){
            if(grid[i][j]== 128){
                return 'WON'
            }
      }
    }
      for (let i=0;i<grid.length;i++){
        for (let j=0;j<grid.length;j++){
            if(grid[i][j]== 0)
                return 'NOT OVER'
        }
      }
        for (let i=0;i< grid.length-1;i++){
          for (let j=0;j< grid.length-1;j++){
            if(grid[i][j]== grid[i + 1][j] || grid[i][j]== grid[i][j + 1])
                return 'NOT OVER'
          }
        }
 
        for (let j=0;j< grid.length-1;j++){        
          if(grid[3][j]== grid[3][j + 1])
            return 'NOT OVER'
        }
        for (let i=0;i<grid.length-1;i++){        
          if(grid[i][3]== grid[i + 1][3])
            return 'NOT OVER'
        }
 
    return 'LOST'
}
reverse(grid:any){
  let newGrid:any=[]
  let row:any;
  for(let i=0;i<grid.length;i++){
    row=[]
    for(let j=0;j<grid.length;j++){
      row.push(grid[i][grid.length-j-1])
    }
    newGrid.push(row)
  }
  return newGrid
}

transpose(grid:any){
  let newGrid:any=[]
  let row:any;
  for(let i=0;i<grid.length;i++){
    row=[]
    for(let j=0;j<grid.length;j++){
    row.push(grid[j][i])
    }
    newGrid.push(row)
  }
  return newGrid
}

 moveLeft(grid:any){
   let newGrid:any;
   let changed:any;
   let changed1:any;
   let changed2:any;
   let result:any;
  //  console.log('Start of left')
    result=this.compress(grid)
    // console.log(result)
    newGrid=result[0]
    changed1=result[1]
    result=this.merge(newGrid)
    newGrid=result[0]
    changed2=result[1]
    if (!(changed1 ||changed2)){
      result=this.compress(newGrid)
    newGrid=result[0]
    changed=result[1]
    }
    
  // console.log('End of left')
  return newGrid
}
  moveRight(grid:any){
    let newGrid:any;
    newGrid=this.reverse(grid)
    console.log('reverse:',newGrid)
    newGrid=this.moveLeft(newGrid)
    newGrid=this.reverse(newGrid)
    return newGrid
  }
  moveUp(grid:any){
    let newGrid:any;
    newGrid=this.transpose(grid)
    newGrid=this.moveLeft(newGrid)
    newGrid=this.transpose(newGrid)
    // console.log('End of Up')
    return newGrid
  }
  moveDown(grid:any){
    let newGrid:any;
    newGrid=this.transpose(grid)
  
    newGrid=this.moveRight(newGrid)
    newGrid=this.transpose(newGrid)
    return newGrid
  }
compress(grid:any){
  let changed = false
  let pos;
  let newGrid:any= []
    for (let i=0;i<grid.length;i++){
        newGrid.push([0,0,0,0])
    }
    for (var i=0;i<grid.length;i++){
        pos = 0
        for (var j=0;j<grid.length;j++){
            if(grid[i][j] != 0){
                newGrid[i][pos] = grid[i][j]
                if(j != pos){
                    changed = true
                }
                pos += 1
            }
       }
        }
      
  return [newGrid,changed]
}

merge(grid:any){
  let changed:any=false
     
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid.length-1;j++){
            if(grid[i][j] == grid[i][j + 1] && grid[i][j] != 0){
                grid[i][j] = grid[i][j] * 2
                this.score+=grid[i][j]
                grid[i][j + 1] = 0
                changed=true
            }
          }
        }
    return [grid,changed]
}

}
