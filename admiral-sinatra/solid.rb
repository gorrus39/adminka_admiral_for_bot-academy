# frozen_string_literal: true

class Logger # rubocop:disable Style/Documentation
  def initialize
    @prefix = '@@@@@@@@@@@@'
  end

  def log(message)
    $stdout.write("#{@prefix} #{message}")
  end
end

class CustomLogger < Logger # rubocop:disable Style/Documentation
  def initialize # rubocop:disable Lint/MissingSuper
    # super
    @prefix = '##################'
  end
end

logger = Logger.new
logger.log 'first message'

puts '', '----'

logger2 = CustomLogger.new
logger2.log 'second message'
