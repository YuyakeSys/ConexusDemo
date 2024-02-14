class CreateStartups < ActiveRecord::Migration[7.0]
  def change
    create_table :startups do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.text :mission
      t.string :industry
      t.text :skill_set
      t.string :status
      t.text :elevator_pitch
      t.boolean :privacy

      t.timestamps
    end
  end
end
