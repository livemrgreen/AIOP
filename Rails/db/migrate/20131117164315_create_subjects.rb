class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.string :label
      t.integer :module_id

      t.timestamps
    end
  end
end
