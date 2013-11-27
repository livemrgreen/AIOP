class Room < ActiveRecord::Base
	belongs_to :building

	has_many :reservations
	has_and_belongs_to_many :characteristics
end
