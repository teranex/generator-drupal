<?php
/**
 * @file
 * <%= project_name %>_base.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function <%= project_name %>_base_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}
