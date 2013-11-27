class Mod < ActiveRecord::Base
	belongs_to :teacher, :dependent => :delete

	has_many :subjects, :foreign_key => "module_id"
end
