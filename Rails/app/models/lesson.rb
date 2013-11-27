class Lesson < ActiveRecord::Base
	belongs_to :lesson_type
	belongs_to :subject
	has_many :teachings
end
