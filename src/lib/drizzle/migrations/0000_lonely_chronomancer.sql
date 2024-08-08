CREATE TABLE `flagship` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`kind` text DEFAULT 'boolean' NOT NULL,
	`value` integer DEFAULT false,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
