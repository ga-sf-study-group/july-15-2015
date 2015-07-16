@colors = ["R", "Y", "G", "B"]
@solution = @colors[rand(0..3)] + @colors[rand(0..3)] + @colors[rand(0..3)] + @colors[rand(0..3)]
@winner = false

def guess
  print "Whats your guess? (type n to exit) "
  @guess = gets.strip.upcase

  system "clear"

  if @guess == 'N'
    @continue = false
    return
  end

  @continue = true
  hits = 0
  pseudohits = 0

  @solution.each_char.with_index do |v, i|
    if v == @guess[i]
      hits += 1
      @guess[i] = " "
    else
      @guess.each_char.with_index do |x, j|
        if x == v
          pseudohits += 1
          @guess[j] = " "
        end
      end
    end
  end

  print "Hits: ", hits, "\n"
  print "Pseudohits: ", pseudohits, "\n\n"

  @winner = true if hits == 4
end

system "clear"
print "MasterMind - The Game\n"
print "The computer has randomly chosen of one of (R, Y, G, B) repeated 4 times. e.g RGGB\n"

loop do
  guess
  break if @winner or not @continue
end

if @winner
  print "You Won!!!\n"
  print "Solution: "
  print @solution, "\n\n"
else
  print "Bye Bye\n\n"
end
